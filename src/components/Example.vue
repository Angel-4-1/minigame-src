<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">

    <img id="sprite" ref="sprite" :src="require(`@/${character.sprite}`)" style="display:none;" alt="Sprite Character">
    <img id="numbers" ref="numbers" :src="require(`@/assets/hola.png`)" style="display:none;" alt="Sprite Numbers">
    <img id="buttons" ref="buttons" :src="require(`@/assets/button.png`)" style="display:none;" alt="Buttons">
    <img id="reset" ref="reset" :src="require(`@/assets/reset.png`)" style="display:none;" alt="Reset button">
    <img id="background" ref="background" :src="require(`@/assets/BG.png`)" style="display:none;" alt="Background">
    <img id="collision" ref="collision" :src="require(`@/assets/collision.png`)" style="display:none;" alt="Collision">
    <img id="tileset" ref="tileset" :src="require(`@/assets/city_tileset.png`)" style="display:none;" alt="Tileset">
    <img id="obstacles" ref="obstacles" :src="require(`@/assets/obstacles.png`)" style="display:none;" alt="Obstacles">

    <canvas id="canvas"></canvas>
    
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES, CHARACTERS, LEVELS } from '@/consts.js';
import * as PLAYER from '../game/player.js';
import * as BUTTON from '../game/button.js';
import * as BACKGROUND from '../game/background.js';
import * as OBSTACLE from '../game/obstacles.js';
import * as UTILS from '../game/utils.js';
import * as GAMEMAP from '../game/gamemap.js';

export default {
    name: 'Example',
    components: {
    },
    props: [
        'levelID',
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
            player: null,           //datos que componen al personaje

            /**BOTONES**/
            pause_button: null,
            reset_button: null,
            buttons: [],            //lista con todos los botones

            /**OBSTACULOS**/
            obstacles: [],

            /**PARTICULAS**/

            /**PUNTOS DE APARICION DE LOS OBSTACULOS**/
            spawn_points: {
                total: 3,           //cuantos puntos de aparicion hay
                points: [192, 498, 806]
            },

            /**OTRAS VARIABLES**/
            globalID_animation: 0,  //controlar el animation frame request
            gamespeed: 2,
            start: undefined,       //tiempo de inicio
            active_time: 0,         //tiempo que el juego lleva activo
            mouseIsDown: false,     //si el boton del raton esta siendo pulsado
            pause_event: null,      //evento para indicar que el juego esta en pause
            play_event: null,       //y para cuando se esta jugando
            status: true,           //true = estamos jugando  |  false = juego en pause
            date_now: null,         //tiempo en el que el juego se ha iniciado
            image_buttons: null,    //imagen sprite de los botones que hay en pantalla
            image_buttons_data: { x: 900, y: 10, width: 80, height: 80, offset: 128, active: false },
            frames_done: 0,
            background: null,       //fondo
            score: 0,
            collisions: 0,
            collision_image: null,

            /**TILEMAP**/
            game_map: null,
            current_sec: 0,
            frameLastSecond: 0
        }
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
                if ( this.pause_button.isHit(x,y) ) {
                    if ( this.status ) {    //estamos en modo Play
                        this.status = false;
                        document.dispatchEvent(this.pause_event);                     
                    } else {    //estamos en modo Pausa
                        this.status = true;
                        document.dispatchEvent(this.play_event);
                    }
                } else if ( this.reset_button.isHit(x,y) ) {
                    this.resetGame();
                }
                return;
            }

            let isMoving = this.player.mousedown(x,y);

            //Indicamos que se ha clicado el raton / tocado la pantalla
            if(isMoving) { this.mouseIsDown = true; }
        },
        //Cuando el raton se esta moviendo
        mousemove(e) {
            let mouse_position = this.getMousePosition(e);
            let x = mouse_position[0];
            let y = mouse_position[1];

            if ( y < 100 ) {    //estamos en el header
                for (let i = 0; i < this.buttons.length; i++) {
                    if( this.buttons[i].isHit(x,y) ) {
                        this.buttons[i].active = true;
                        break;
                    } else {
                        this.buttons[i].active = false;
                    }
                }
                
            }
        },
        //Dejar de pulsar al raton
        mouseup() {
            //Se ejecutara lo mismo para los eventos mouseup & touchend
            if( this.mouseIsDown ) {
                this.mouseIsDown = false;
                this.player.onMouseUp();
            }
        },
        keyUpDown(event, timestamp) {
            //keydown = true  |  keyup = false
            let key_state = (event.type == "keydown") ? true : false;

            //Mirar que tecla se ha pulsado
            if ( key_state ) {
                switch( event.keyCode ) {
                    case 37:    //left key
                        this.player.move(false);
                        break;
                    case 38:    //up key
                        this.player.animation_set = this.player.animation[this.player.BACK];
                        break;
                    case 39:    //right key
                        this.player.move(true);
                        break;
                    default:
                        break;
                }
            } else {
                this.player.onMouseUp();
            }
        },
        scored() {
            this.score++;
        },
        handleScore() {
            //Texto
            this.context.font = "60px Carter One";
            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            this.context.fillText("S: " + this.score, 400, 70);
            this.context.fillText("C: " + this.collisions, 600, 70);
        },
        //Se llama en cada ciclo del juego
        update(timestamp) {
            //Player
            this.player.update(timestamp, this.gamespeed, this.frames_done);

            if (this.mouseIsDown) {
                this.player.moveOnMouseDown();
            }

            var obs_score = OBSTACLE.handleObstacles(this.obstacles, this.context, this.canvas, this.gamespeed, this.score);
            this.obstacles = obs_score[0];
            this.score = obs_score[1];

            //isHit ?
            this.handleCollisions();
        },
        handleCollisions() {
            for (let i = 0; i < this.obstacles.length; i++ ) {
                if ( UTILS.collisionCenter(this.player.pos.x, this.player.pos.y, this.player.SPRITE_SIZE_X, this.player.SPRITE_SIZE_Y, this.obstacles[i].x, this.obstacles[i].y, this.obstacles[i].width, this.obstacles[i].height, true ) && this.obstacles[i].isHit == false ) {
                    this.collisions++;
                    this.obstacles[i].isHit = true;
                    //UTILS.drawImageAtPoint(this.context, this.collision_image, this.player.pos.x, this.player.pos.y, 100, 100);
                }
            }
        },
        render(timestamp) {
            //Resetear todo lo dibujado anteriormente
            this.resetCanvas();           

            //Actualizar datos
            this.update(timestamp);

            //Player
            this.player.draw(this.context);
            
            //Encabezado
            this.drawHeader();

            //Dibujar botones
            for( let i= 0; i < this.buttons.length; i++) {
                this.buttons[i].draw(this.context);
            }

            //Puntos
            this.handleScore();

            //FPS
            this.drawFPS();

            this.display.drawImage(this.context.canvas, 0, 0, this.context.canvas.width, this.context.canvas.height, 0, 0, this.display.canvas.width, this.display.canvas.height);

            //Loop infinito
            this.globalID_animation = window.requestAnimationFrame(this.render);

            //this.frames_done++;
        },
        drawHeader() {
            //Encabezado
            this.context.fillStyle = "rgba(250, 200, 200, 1)";
            this.context.fillRect(0, 0, this.context.canvas.width, 100);
            //Texto
            this.context.font = "60px Carter One";
            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            this.context.fillText("Time: " + this.active_time, 20, 70);
        },
        drawFPS() {
            //FPS
            if (this.active_time != this.current_sec) {
                this.current_sec = this.active_time;
                this.frameLastSecond = this.frames_done;
                this.frames_done = 1;
            } else {
                this.frames_done++;
            }

            this.context.font = "60px Carter One";
            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            this.context.fillText("FPS: " + this.frameLastSecond, 15, 200);
        },
        resetCanvas() {
            //Resetar canvas
            this.context.fillStyle = "rgba(255, 255, 255, 1)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            //Fondo
            //this.background.handleBackground(this.gamespeed, this.context);
            this.game_map.drawMap(this.gamespeed, this.context);     
        },
        resetGame() {
            this.resetCanvas();
            this.player.reset();
            this.date_now = Date.now();
            this.status = true;
            this.score = 0;
            this.collisions = 0;
            this.obstacles.length = 0;
            this.obstacles = OBSTACLE.initObstacles(this.obstacles, this.spawn_points);
        },
        onResize() {
            this.display.canvas.height = document.documentElement.clientHeight - 0.05*document.documentElement.clientHeight;
            
            if (this.display.canvas.height > document.documentElement.clientWidth) {
                this.display.canvas.height = document.documentElement.clientWidth;
            }

            this.display.canvas.width = this.display.canvas.height * 0.9;
            this.display.imageSmoothingEnabled = false;
        }
    },
    mounted() {
        /**INSTANCIAR VARIABLES INICIALES**/
        this.canvas  = document.createElement("canvas");
        this.context = this.canvas.getContext('2d');
        this.display_canvas = document.querySelector("canvas");
        this.display = document.querySelector("canvas").getContext("2d");
        //Dimensiones iniciales
        this.context.canvas.width = 1000;
        this.context.canvas.height = 1000;
        //Redimensionar para ajustar tamaño
        this.onResize();

        /**CREAR AL PLAYER**/
        this.player = new PLAYER.Player(this.$refs.sprite, this.character.animation, this.character.frames, this.character.sprite_size_x, this.character.sprite_size_y );
        //Set de animaciones inicial
        this.player.setAnimation(this.player.BACK);
        //Offset del player
        this.player.offset = { x: -this.player.SPRITE_SIZE_X/2 , y: -this.player.SPRITE_SIZE_Y/2 };

        /**BOTONES**/
        this.pause_button = new BUTTON.Button(this.$refs.buttons, 900, 10, 80, 80, 128, false);
        this.reset_button = new BUTTON.Button(this.$refs.reset, 800, 10, 80, 80, 128, false);
        this.buttons.push(this.pause_button, this.reset_button);

        /**FONDO DEL JUEGO**/
        this.background = new BACKGROUND.Background(this.$refs.background, this.canvas);

        /**OBSTACULOS**/
        this.obstacles = OBSTACLE.initObstacles(this.$refs.obstacles, this.obstacles, this.spawn_points);

        /**COLLISION**/
        this.collision_image = this.$refs.collision;

        /**MAPA**/
        this.game_map = new GAMEMAP.Gamemap(this.$refs.tileset, this.canvas);

        /**EVENTOS**/
        //Mouse events
        this.display_canvas.addEventListener('mousedown', this.mousedown);
        this.display_canvas.addEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);
        //key events
        window.addEventListener("keydown", this.keyUpDown);
        window.addEventListener("keyup", this.keyUpDown);
        //Resize
        window.addEventListener('resize', this.onResize);
        //Touch events
        this.display_canvas.addEventListener('touchstart', this.mousedown);
        this.display_canvas.addEventListener('touchend', this.mouseup);
        //Pause events
        this.pause_event = new Event('pause');
        this.play_event = new Event('play');
        document.addEventListener('pause', this.cancelAnimation);
        document.addEventListener('play', this.startAnimation);

        /**CONTROLAR TIEMPO**/
        //start time
        this.date_now = Date.now();
        setInterval(() => {
            var delta = Date.now() - this.date_now; // milliseconds elapsed since start
            this.active_time  = Math.floor(delta / 1000); // in seconds
        }, 1000); // update about every second

        /**INICIAR LOOP JUEGO**/
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
        document.removeEventListener('pause', this.cancelAnimation);
        document.removeEventListener('play', this.startAnimation);
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