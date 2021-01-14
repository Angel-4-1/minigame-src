<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">

    <img id="sprite" ref="sprite" :src="require(`@/${character.sprite}`)" style="display:none;" alt="Sprite Character">
    <img id="numbers" ref="numbers" :src="require(`@/assets/hola.png`)" style="display:none;" alt="Sprite Numbers">
    <img id="buttons" ref="buttons" :src="require(`@/assets/button.png`)" style="display:none;" alt="Buttons">
    <canvas ref="canvas" id="canvas"></canvas>
    <br>
    <button @click="resetGame">RESET</button>
    <!--
        <button style="margin-left: 20px;" @click="startAnimation">START</button>
        <button style="margin-left: 20px;" @click="cancelAnimation">STOP</button>
    -->

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES, CHARACTERS, LEVELS } from '@/consts.js';

export default {
    name: 'CanvasExample',
    components: {
    },
    props: [
        'characterID'
    ],
    data() {
        return {
            /**CANVAS**/
            canvas: null,           //canvas original
            context: null,          //context del canvas
            display_canvas: null,   //canvas escalado
            display: null,          //context del canvas escalado

            /**PLAYER**/
            //importar el personaje escogido
            character: CHARACTERS[ this.$props['characterID'] ],
            //declaracion de los datos que componen al personaje
            player: {
                sprite: null,               //imagen sprite
                sprite_x: 0, sprite_y: 0,
                sprite_width: 0, sprite_height: 0, sprite_right: 0, sprite_bottom: 0,
                animation: [],              //animaciones
                animation_set: [],          //animacion que esta siendo utilizada
                frames: 0,                  //de cuantos frames se compone cada set de animaciones
                current_frame: 0,           //frame en el que estamos
                speed: 20,                  //velocidad a la que se mueve
                pos: { x: 500, y: 855 },    //posicion
                target_pos: { x: 0, y: 0 }, //posicion objetivo
                offset: {x: 0, y: 0},       //donde se guarda la posicion central del sprite
                SPRITE_SIZE_X: 16,          //dimensiones de cada frame
                SPRITE_SIZE_Y: 16,
                FRONT: 0,                   //posiciones animaciones
                RIGHT: 1,
                LEFT: 2,
                BACK: 3,
            },

            /**OBSTACULOS**/
            //declaracion de 1 solo obstaculo
            obstacle: {
                sprite: null,       //imagen sprite
                type: null,         //que tipo de obstaculo es
                pos: { x: 0, y: 0}, //posicion
                width: 512,
                height: 170
            },
            //todos los obstaculos
            obstacles: {
                list: [],           //lista donde se guardan todos los obstaculos
            },

            /**PUNTOS DE APARICION DE LOS OBSTACULOS**/
            spawn_points: {
                total: 3,           //cuantos puntos de aparicion hay
                left: 65,
                middle: 375,
                right: 680
            },

            /**OTRAS VARIABLES**/
            globalID_animation: 0,  //controlar el animation frame request
            speed: 250,
            start: undefined,       //tiempo de inicio
            active_time: 0,         //tiempo que el juego lleva activo
            mouseIsDown: false,     //si el boton del raton esta siendo pulsado
            pause_event: null,      //evento para indicar que el juego esta en pause
            play_event: null,       //y para cuando se esta jugando
            status: true,           //true = estamos jugando  |  false = juego en pause
            date_now: null,         //tiempo en el que el juego se ha iniciado
            image_buttons: null,    //imagen sprite de los botones que hay en pantalla
            image_buttons_data: { x: 900, y: 10, width: 80, height: 80, offset: 128, active: false }            
        }
    },
    computed: {
        ...mapState( ['stage'] )
    },
    methods: {
        getPosition(clientX, clientY) {
            let rect = this.display_canvas.getBoundingClientRect();
            //let rect = this.canvas.getBoundingClientRect();
            let scaleX = this.canvas.width / rect.width;
            let scaleY = this.canvas.height / rect.height;

            //Coordenadas x,y despues de ser relativas al elemento
            let x = (clientX - rect.left) * scaleX;
            let y = (clientY - rect.top) * scaleY;
            
            return [x,y];
        },
        //Obtener coordenadas x,y cuando se pulsa el raton
        getMousePosition(e) {
            return this.getPosition(e.clientX, e.clientY);
        },
        //Obtener coordenadas x,y cuando se toca la pantalla
        getTouchPosition(e) {
            return this.getPosition(e.touches[0].clientX, e.touches[0].clientY);
        },
        //Empezar animacion del canvas
        startAnimation() {
            this.globalID_animation = requestAnimationFrame(this.render);
        },
        //Parar animacion canvas
        cancelAnimation() {
            cancelAnimationFrame(this.globalID_animation);
        },
        //Cuando se ha pulsado el raton o tocado la pantalla
        mousedown(e) {
            let mouse_position = [];
            
            //Miramos en que tipo de evento estamos (touch / mouse)
            if ( e.type == "touchstart" ) {     //Touchstart event
                mouse_position = this.getTouchPosition(e);
            } else {                            //Mousedown event
                mouse_position = this.getMousePosition(e);
            }
            
            //Obtener coordenadas x,y
            let x = mouse_position[0];
            let y = mouse_position[1];

            if ( y < 100 ) {    //estamos en el header
                if ( this.isButtonHit(x,y) ) {
                    if ( this.status ) {    //estamos en modo Play
                        this.status = false;
                        document.dispatchEvent(this.pause_event);                     
                    } else {    //estamos en modo Pausa
                        this.status = true;
                        document.dispatchEvent(this.play_event);
                    }
                }
                return;
            }

            //Donde estan estas coordenadas respecto al player ?
            if ( x < this.player.pos.x + this.player.offset.x) {          //Antes
                this.player.animation_set = this.player.animation[this.player.LEFT];
            } else if ( x > this.player.pos.x + this.player.offset.x ) {   //Despues
                this.player.animation_set = this.player.animation[this.player.RIGHT];
            } else {    //Justo encima
                this.player.animation_set = this.player.animation[this.player.BACK];
                return;
            }

            //Indicamos que se ha clicado el raton / tocado la pantalla
            this.mouseIsDown = true;
            this.player.target_pos = { x: x, y: y };
        },
        //Cuando el raton se esta moviendo
        mousemove(e) {
            let mouse_position = this.getMousePosition(e);
            let x = mouse_position[0];
            let y = mouse_position[1];

            if ( y < 100 ) {    //estamos en el header
                if ( this.isButtonHit(x,y) ) {
                    this.image_buttons_data.active = true;
                } else {
                    this.image_buttons_data.active = false;
                }
            }
        },
        //Dejar de pulsar al raton
        mouseup() {
            //Se ejecutara lo mismo para los eventos mouseup & touchend
            if( this.mouseIsDown ) {
                this.mouseIsDown = false;
                this.player.animation_set = this.player.animation[this.player.BACK];
            }
        },
        isPlayerHit(x, y) {
            return (x > this.player.sprite_x && x < this.player.sprite_x + this.player.sprite_width && y > this.player.sprite_y && y < this.player.sprite_y + this.player.sprite_height);
        },
        isButtonHit(x, y) {
            return (x > this.image_buttons_data.x && x < this.image_buttons_data.x + this.image_buttons_data.width && y > this.image_buttons_data.y && y < this.image_buttons_data.y + this.image_buttons_data.height);
        },
        isObstacleHit(obstacle) { 
            var obs_left = obstacle.pos.x;
            var obs_right = obs_left + obstacle.width;
            var obs_top = obstacle.y;
            var obs_bottom = obs_top + obstacle.height;

            var pl_left = this.player.pos.x - this.player.SPRITE_SIZE_X/2;
            var pl_right = pl_left + this.player.SPRITE_SIZE_X;
            var pl_top = this.player.pos.y - this.player.SPRITE_SIZE_Y/2;
            var pl_bottom = pl_top + this.player.SPRITE_SIZE_Y;

            if ( (pl_left < obs_right) && (pl_left > obs_left) ) {
                return true;
            }

            return false;
        }, 
        resetGame() {
            this.resetCanvas();
            this.player.pos = { x: 500, y:855 };
            this.date_now = Date.now();
            this.status = true;
        },
        resetCanvas() {
            //Resetar canvas
            this.context.fillStyle = "rgba(255, 255, 255, 1)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            //Suelo
            this.context.fillStyle = "rgba(100, 190, 120, 1)";
            this.context.fillRect(0, 900, this.context.canvas.width, 100);
            //Object
            this.context.drawImage(this.obstacle.sprite, 0, 0, this.obstacle.width, this.obstacle.height, this.obstacle.pos.x, this.obstacle.pos.y, 250, 250);
            //Encabezado
            this.context.fillStyle = "rgba(250, 200, 200, 1)";
            this.context.fillRect(0, 0, this.context.canvas.width, 100);
            this.context.drawImage(this.image_buttons, this.image_buttons_data.active ? this.image_buttons_data.offset : 0, 0, 128, 128, this.image_buttons_data.x, this.image_buttons_data.y, this.image_buttons_data.width, this.image_buttons_data.height);
            //Texto
            this.context.font = "60px Carter One";
            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            this.context.fillText("Score: " + this.active_time, 20, 70);
            //Barras laterales
            this.context.fillStyle = "rgba(180, 130, 130, 1)";
            this.context.fillRect(0, 100, 50, this.context.canvas.height - 200);
            this.context.fillRect(950, 100, 50, this.context.canvas.height - 200);
            //Columnas
            this.context.fillStyle = "rgba(100, 100, 100, 1)";
            this.context.fillRect(336, 100, 20, this.context.canvas.height - 200);
            this.context.fillRect(642, 100, 20, this.context.canvas.height - 200);           
        },
        /*
        updateImageValues(x,y) {
            this.imageX = x;     //Inicio posicion X
            this.imageY = y;     //Inicio posicion Y
            this.imageWidth = this.image.width;
            this.imageHeight = this.image.height;
            this.imageRight = this.imageX + this.imageWidth;    //Final posicion X
            this.imageBottom = this.imageY + this.imageHeight   //Final posicion Y
        },*/
        //Funion encargada de renderizar el juego
        render(timestamp) {
            //Resetear todo lo dibujado anteriormente
            this.resetCanvas();

            //Actualizar datos
            this.update(timestamp);

            //Player
            this.context.drawImage(this.player.sprite, this.player.animation_set[this.player.current_frame].x * this.player.SPRITE_SIZE_X, this.player.animation_set[this.player.current_frame].y * this.player.SPRITE_SIZE_Y, this.player.SPRITE_SIZE_X, this.player.SPRITE_SIZE_Y, Math.floor(this.player.pos.x + this.player.offset.x), Math.floor(this.player.pos.y + this.player.offset.y), this.player.SPRITE_SIZE_X, this.player.SPRITE_SIZE_Y);
            
            this.display.drawImage(this.context.canvas, 0, 0, this.context.canvas.width, this.context.canvas.height, 0, 0, this.display.canvas.width, this.display.canvas.height);

            //Loop infinito
            this.globalID_animation = window.requestAnimationFrame(this.render);
        },
        playerSteps(timestamp) {
            if ( this.start === undefined ) {
                this.start = timestamp;
            }
            const elapsed = timestamp - this.start;
            if ( elapsed >= this.speed ) {
                this.start = timestamp;
                this.player.current_frame++;

                if ( this.player.current_frame >= this.player.frames ) {
                    this.player.current_frame = 0;
                }
            }
        },
        isValidPositionPlayer(x) {
            if ( x >= 100 && x <= 900 ) {
                return true;
            }

            return false;
        },
        keyUpDown(event, timestamp) {
            //keydown = true  |  keyup = false
            let key_state = (event.type == "keydown") ? true : false;

            //Mirar que tecla se ha pulsado
            if ( key_state ) {
                switch( event.keyCode ) {
                    case 37:    //left key
                        this.player.animation_set = this.player.animation[this.player.LEFT];
                        var target_x = this.player.pos.x - 0.25 * this.player.speed;
                        if( this.isValidPositionPlayer(target_x) ) { this.player.pos.x = target_x; }
                        break;
                    case 38:    //up key
                        this.player.animation_set = this.player.animation[this.player.BACK];
                        break;
                    case 39:    //right key
                        this.player.animation_set = this.player.animation[this.player.RIGHT];
                        var target_x = this.player.pos.x + 0.25 * this.player.speed;
                        if( this.isValidPositionPlayer(target_x) ) { this.player.pos.x = target_x; }
                        break;
                    default:
                        break;
                }
            } else {
                this.player.animation_set = this.player.animation[this.player.BACK];
            }
        },
        //Se llama en cada ciclo del juego
        update(timestamp) {
            //Player
            this.playerSteps(timestamp);

            if (this.mouseIsDown) {
                if ( this.player.target_pos.x - (this.player.SPRITE_SIZE_X / 4) < this.player.pos.x + this.player.offset.x ) {
                    var target_x = this.player.pos.x - 0.25 * this.player.speed;
                    if( this.isValidPositionPlayer(target_x) ) { this.player.pos.x = target_x; }
                } else if ( this.player.target_pos.x - (this.player.SPRITE_SIZE_X / 2) > this.player.pos.x + this.player.offset.x ) {
                    var target_x = this.player.pos.x + 0.25 * this.player.speed;
                    if( this.isValidPositionPlayer(target_x) ) { this.player.pos.x = target_x; }
                } else {
                    this.player.animation_set = this.player.animation[this.player.BACK];
                    this.mouseIsDown = false;
                }
            }

            //Obstacle
            let target_object_y = this.obstacle.pos.y + 2.5;
            if( target_object_y < this.context.canvas.height ) {
                this.obstacle.pos.y = target_object_y;
            } else {
                this.obstacle.pos.y = 0;
                //escoger un punto de aparicion
                var random = Math.floor(Math.random() * this.spawn_points.total) + 1;
                switch( random ) {
                    case 1:
                        this.obstacle.pos.x = this.spawn_points.left;
                        break;
                    case 2:
                        this.obstacle.pos.x = this.spawn_points.middle;
                        break;
                    case 3:
                        this.obstacle.pos.x = this.spawn_points.right;
                        break;
                    default:
                        break;
                }
            }

            //isHit ?
            //var s = this.isObstacleHit(this.obstacle);
            //if ( s ) {console.log("HIT")}

        },
        onResize() {
            //this.windowHeight = window.innerHeight;
            //this.windowWidth = window.innerWidth;
            //let aspect_ratio = this.windowHeight / this.windowWidth;
            //let sp = document.getElementById("sprite");
            //sp.style.zoom = Math.max( 5 / aspect_ratio, 5);
            this.display.canvas.height = document.documentElement.clientHeight - 0.1*document.documentElement.clientHeight;
            
            if (this.display.canvas.height > document.documentElement.clientWidth) {
                this.display.canvas.height = document.documentElement.clientWidth;
            }

            this.display.canvas.width = this.display.canvas.height * 0.9;
            this.display.imageSmoothingEnabled = false;
        }
    }, 
    mounted() {
        //Instanciar variables
        this.canvas  = document.createElement("canvas");
        //this.canvas  = document.getElementByID("canvas");
        this.context = this.canvas.getContext('2d');
        this.display_canvas = document.querySelector("canvas");
        this.display = document.querySelector("canvas").getContext("2d");
        this.player.sprite = this.$refs.sprite;
        this.obstacle.sprite = this.$refs.numbers;
        this.image_buttons = this.$refs.buttons;
        this.obstacle.pos = { x: 65, y: 100 };
        
        //Dimensiones iniciales
        this.context.canvas.width = 1000;
        this.context.canvas.height = 1000;
        //Redimensionar para ajustar tamaño
        this.onResize();

        //Crear eventos
        this.display_canvas.addEventListener('mousedown', this.mousedown);
        this.display_canvas.addEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);
        window.addEventListener("keydown", this.keyUpDown);
        window.addEventListener("keyup", this.keyUpDown);
        window.addEventListener('resize', this.onResize);
        //Touch events
        this.display_canvas.addEventListener('touchstart', this.mousedown);
        this.display_canvas.addEventListener('touchend', this.mouseup);
        //Pause events
        this.pause_event = new Event('pause');
        this.play_event = new Event('play');
        document.addEventListener('pause', this.cancelAnimation);
        document.addEventListener('play', this.startAnimation);

        /*Cargar datos del personaje*/
        //Animaciones
        this.player.animation = this.character.animation;
        //Set de animaciones inicial
        this.player.animation_set = this.player.animation[this.player.BACK];
        //Numero de frames
        this.player.frames = this.character.frames;
        //Dimensiones sprite
        this.player.SPRITE_SIZE_X = this.character.sprite_size_x;
        this.player.SPRITE_SIZE_Y = this.character.sprite_size_y;

        //start time
        this.date_now = Date.now();
        setInterval(() => {
            var delta = Date.now() - this.date_now; // milliseconds elapsed since start
            this.active_time  = Math.floor(delta / 1000); // in seconds
        }, 1000); // update about every second

        //Offset del player
        this.player.offset = { x: -this.player.SPRITE_SIZE_X/2 , y: -this.player.SPRITE_SIZE_Y/2 };

        //Iniciar loop de juego
        this.globalID_animation = window.requestAnimationFrame(this.render);

        this.isObstacleHit(this.obstacle);
    },
    beforeUnmount() {
        //Eliminar todos los eventos creados
        this.display_canvas.removeEventListener('mousedown', this.mousedown);
        this.display_canvas.removeEventListener('mousemove', this.mousemove);
        document.removeEventListener('mouseup', this.mouseup);
        window.removeEventListener('keydown', this.keyUpDown);
        window.removeEventListener('keyup', this.keyUpDown);
        window.removeEventListener('resize', this.onResize); 
        this.display_canvas.removeEventListener('touchstart', this.touchstart);
        this.display_canvas.removeEventListener('touchend', this.touchend);
    }
}
</script>

<style scoped>
h1, h2, h3 {
    color: #fff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

canvas {
    background-color: #dbd6d6;
    margin-top: 1%;
    /*No interpolacion*/
    image-rendering: pixelated;
}
</style>