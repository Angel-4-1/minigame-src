<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">

    <img id="sprite" ref="sprite" :src="require(`@/${character.sprite}`)" style="display:none;" alt="Sprite Character">
    <img id="numbers" ref="numbers" :src="require(`@/assets/hola.png`)" style="display:none;" alt="Sprite Numbers">
    <canvas ref="canvas" id="canvas"></canvas>
    <br>
    <button @click="resetGame">RESET</button>
    <button style="margin-left: 20px;" @click="startAnimation">START</button>
    <button style="margin-left: 20px;" @click="cancelAnimation">STOP</button>

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
            character: CHARACTERS[ this.$props['characterID'] ],
            canvas: null,   //canvas original
            context: null,  //context del canvas
            display_canvas: null, //canvas escalado
            display: null,  //context del canvas escalado
            //Imagen
            image: null,
            imageX: 0, 
            imageY: 0,
            imageWidth: 0, imageHeight: 0, imageRight: 0, imageBottom: 0,
            //Dimensiones del sprite del personaje
            SPRITE_SIZE_X: 16,
            SPRITE_SIZE_Y: 16,
            //Controlar el animation frame request
            globalID_animation: 0,
            //Posicion del personaje
            player: { x: 500, y: 855 },
            player_offset: null,
            //Posicion a la que ha de llegar 
            target_pos: [ {x: 0, y: 0} ],
            //Animaciones personaje
            animation: [],
            //Animacion utilizada
            animation_set: [],
            //De cuantos frames se compone cada set de animaciones
            frames: 0,
            currentFrame: 0,
            speed: 250,
            //Velocidad de movimiento del personaje
            speed_player: 20,
            //Tiempo de inicio
            start: undefined,
            start_time: 0,
            //Si el boton del raton esta siendo pulsado
            mouseIsDown: false,
            //Posiciones animaciones
            FRONT: 0,
            RIGHT: 1,
            LEFT: 2,
            BACK: 3,
            //Imagen numeros
            image_numbers: null
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
            let x = (clientX - rect.left) * scaleX ;
            let y = (clientY - rect.top) * scaleY;
            
            //console.log(x + ' ' + y);

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

            //Donde estan estas coordenadas respecto al player ?
            if ( x < this.player.x + this.player_offset.x) {          //Antes
                this.animation_set = this.animation[this.LEFT];
            } else if ( x > this.player.x + this.player_offset.x ) {   //Despues
                this.animation_set = this.animation[this.RIGHT];
            } else {                            //Encima
                this.animation_set = this.animation[this.BACK];
                return;
            }

            //Indicamos que se ha clicado el raton / tocado la pantalla
            this.mouseIsDown = true;
            this.target_pos.x = x;
            this.target_pos.y = y;
        },
        mousemove(e) {
            let mouse_position = this.getMousePosition(e);
            let x = mouse_position[0];
            let y = mouse_position[1];
        },
        mouseup() {
            //Se ejecutara lo mismo para los eventos mouseup & touchend
            if( this.mouseIsDown ) {
                this.mouseIsDown = false;
                this.animation_set = this.animation[this.BACK];
            }
        },
        isImageHit: function(x, y){
            return (x > this.imageX && x < this.imageX + this.imageWidth && y > this.imageY && y < this.imageY + this.imageHeight);
        },
        resetGame() {
            this.resetCanvas();
            this.player.x = 500; this.player.y = 855;
        },
        resetCanvas() {
            //Resetar canvas
            this.context.fillStyle = "rgba(255, 255, 255, 1)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            //Suelo
            this.context.fillStyle = "rgba(100, 190, 120, 1)";
            this.context.fillRect(0, 900, this.context.canvas.width, 100);
            //Barras laterales
            this.context.fillStyle = "rgba(180, 130, 130, 1)";
            this.context.fillRect(0, 0, 50, this.context.canvas.height - 100);
            this.context.fillRect(950, 0, 50, this.context.canvas.height - 100);
            //Columnas
            this.context.fillStyle = "rgba(100, 100, 100, 1)";
            this.context.fillRect(336, 0, 20, this.context.canvas.height - 100);
            this.context.fillRect(642, 0, 20, this.context.canvas.height - 100);
            //Texto
            this.context.font = "60px Carter One";
            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            //this.context.drawImage(this.image_numbers, 0, 0, 512, 170, 10, 10, 700, 400);
            this.context.fillText("Score: " + this.start_time, 670, 70);
        },
        updateImageValues(x,y) {
            this.imageX = x;     //Inicio posicion X
            this.imageY = y;     //Inicio posicion Y
            this.imageWidth = this.image.width;
            this.imageHeight = this.image.height;
            this.imageRight = this.imageX + this.imageWidth;    //Final posicion X
            this.imageBottom = this.imageY + this.imageHeight   //Final posicion Y
        },
        //funion encargada de renderizr el juego
        render(timestamp) {
            //Resetear todo lo dibujado anteriormente
            this.resetCanvas();

            //Actualizar datos
            this.update(timestamp);

            //Player // drawImage(img,sx,sy,swidth,sheight,x,y,width,height)
            this.context.drawImage(this.image, this.animation_set[this.currentFrame].x * this.SPRITE_SIZE_X, this.animation_set[this.currentFrame].y * this.SPRITE_SIZE_Y, this.SPRITE_SIZE_X, this.SPRITE_SIZE_Y, Math.floor(this.player.x + this.player_offset.x), Math.floor(this.player.y + this.player_offset.y), this.SPRITE_SIZE_X,this.SPRITE_SIZE_Y);
            
            this.display.drawImage(this.context.canvas, 0, 0, this.context.canvas.width, this.context.canvas.height, 0, 0, this.display.canvas.width, this.display.canvas.height);

            //Loop infinito
            this.globalID_animation = window.requestAnimationFrame(this.render);
        },
        playerSteps(timestamp) {
            if (this.start === undefined) {
                this.start = timestamp;
            }
            const elapsed = timestamp - this.start;
            if (elapsed >= this.speed) {
                this.start = timestamp;
                this.currentFrame++;

                if (this.currentFrame >= this.frames) {
                    this.currentFrame = 0;
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
            if (key_state) {
                switch(event.keyCode) {
                    case 37:    //left key
                        this.animation_set = this.animation[this.LEFT];
                        var target_x = this.player.x - 0.25 * this.speed_player;
                        if( this.isValidPositionPlayer(target_x) ) { this.player.x = target_x; }
                        break;
                    case 38:    //up key
                        this.animation_set = this.animation[this.BACK];
                        break;
                    case 39:    //right key
                        this.animation_set = this.animation[this.RIGHT];
                        var target_x = this.player.x + 0.25 * this.speed_player;
                        if( this.isValidPositionPlayer(target_x) ) { this.player.x = target_x; }
                        break;
                    default:
                        break;
                }
            } else {
                this.animation_set = this.animation[this.BACK];
            }
        },
        //Se llama en cada ciclo del juego
        update(timestamp) {
            this.playerSteps(timestamp);

            if (this.mouseIsDown) {
                if ( this.target_pos.x - (this.SPRITE_SIZE_X / 4) < this.player.x + this.player_offset.x ) {
                    var target_x = this.player.x - 0.25 * this.speed_player;
                    if( this.isValidPositionPlayer(target_x) ) { this.player.x = target_x; }
                } else if ( this.target_pos.x - (this.SPRITE_SIZE_X / 2) > this.player.x + this.player_offset.x ) {
                    var target_x = this.player.x + 0.25 * this.speed_player;
                    if( this.isValidPositionPlayer(target_x) ) { this.player.x = target_x; }
                } else {
                    this.animation_set = this.animation[this.BACK];
                    this.mouseIsDown = false;
                }
            }
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
        this.image = this.$refs.sprite;
        this.image_numbers = this.$refs.numbers;
        
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

        /*Cargar datos del personaje*/
        //Animaciones
        this.animation = this.character.animation;
        //Set de animaciones inicial
        this.animation_set = this.animation[this.BACK];
        //Numero de frames
        this.frames = this.character.frames;
        //Dimensiones sprite
        this.SPRITE_SIZE_X = this.character.sprite_size_x;
        this.SPRITE_SIZE_Y = this.character.sprite_size_y;

        //start time
        this.date_now = Date.now();
        setInterval(() => {
            var delta = Date.now() - this.date_now; // milliseconds elapsed since start
            this.start_time  = Math.floor(delta / 1000); // in seconds
        }, 1000); // update about every second

        //Offset del player
        this.player_offset = { x: -this.SPRITE_SIZE_X/2 , y: -this.SPRITE_SIZE_Y/2 };

        //Iniciar loop de juego
        this.globalID_animation = window.requestAnimationFrame(this.render);
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