<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

    <canvas id="canvas"></canvas>
    
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES, CHARACTERS, LEVELS, MAPS } from '@/consts.js';
import * as PLAYER from '../game/player.js';
import * as BUTTON from '../game/button.js';
import * as BACKGROUND from '../game/background.js';
import * as OBSTACLE from '../game/obstacles.js';
import * as UTILS from '../game/utils.js';
import * as GAMEMAP from '../game/gamemap.js';
import * as PARTICLE from '../game/particles.js';
import * as SNOW from '../game/snow.js';
import * as FLOATINGMESSAGE from '../game/floatingMessage.js';

export default {
    name: 'MyCanvas',
    emits: [ 'openPauseMenu', 'openQuiz', 'gameOver' ],
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

            /**NIVEL**/
            //level: LEVELS[ this.$props['levelID'] ],
            //tileset: LEVELS[ this.$props['levelID'] ].tileset,
            tileset_snow: false,

            /**MAPA */
            maps: null,
            tileset: null,
            current_map: null,

            /**PARTICULAS**/
            snow: null,
            isSnowing: false,

            /**PUNTOS DE APARICION DE LOS OBSTACULOS**/
            spawn_points: {
                total: 3,           //cuantos puntos de aparicion hay
                points: [192, 498, 806]
            },

            /**OTRAS VARIABLES**/
            globalID_animation: 0,  //controlar el animation frame request
            gamespeed: 4,
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
            last: 0,                //timestamp frame anterior
            color_header: "rgba(250, 200, 200, 1)",
            ability_button: null,
            image_container: {},
            images_preload: 7,
            images_current: 0,
            finish: null,

            /**TILEMAP**/
            game_map: null,
            current_sec: 0,
            frameLastSecond: 0,

            /**FLOATING MESSAGES**/
            floatingMessages: []
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
        pauseGame() {
            this.status = false;
            document.dispatchEvent(this.pause_event);
            this.$emit('openPauseMenu');             
        },
        continueGame() {
            this.status = true;
            document.dispatchEvent(this.play_event);
        },
        gameOver() {
            console.log( "GAME OVER" );
            this.status = false;
            document.dispatchEvent(this.pause_event);
            //this.cancelAnimation();
            //this.pauseGame();
            //cancelAnimationFrame(this.globalID_animation);
            var msg = { score: this.score, character: this.$props['characterID'], level: this.$props['levelID'], time: this.active_time };
            this.$emit( 'gameOver', JSON.stringify( msg ) );       
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

            if ( y < 220 ) {    //estamos en el header
                if ( this.pause_button.isHit(x,y) ) {
                    if ( this.status ) {    //estamos en modo Play
                        this.pauseGame();           
                    } else {    //estamos en modo Pausa
                        this.continueGame();
                    }
                } else if ( this.reset_button.isHit(x,y) ) {
                    //this.resetGame();
                    //SOLO DE PRUEBA --> llama al quiz
                    this.status = false;
                    document.dispatchEvent(this.pause_event);
                    this.$emit('openQuiz');
                    
                } else if ( this.character.has_ability ) {
                    if ( this.ability_button.isHit(x,y) ) {
                        if (this.tileset_snow) { 
                            this.changeTileset( MAPS[ this.maps[0] ].tileset );
                            this.tileset_snow = false;
                            this.gamespeed = 4;
                            this.isSnowing = false;
                            this.player.changeParticleColor( "rgba(0,0,0,");
                            this.color_header = "rgba(250, 200, 200, 1)";
                            this.ability_button.active = false;
                        } else {
                            this.changeTileset( MAPS[ this.maps[1] ].tileset );
                            this.tileset_snow = true;
                            this.gamespeed = 2;
                            this.isSnowing = true;
                            this.snow = new SNOW.Snow( this.canvas.width, this.canvas.height );
                            this.snow.createSnowParticles();
                            this.player.changeParticleColor( "rgba(255,255,255,");
                            this.color_header = "rgba(150, 220, 240, 1)";
                            this.ability_button.active = true;
                        }
                    }
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
            this.context.font = "60px Press Start 2P";
            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            this.context.fillText("S: " + this.score, 400, 70);
            this.context.fillText("C: " + this.collisions, 600, 70);
        },
        //Se llama en cada ciclo del juego
        update( elapsed_time ) {
            //Player
            this.player.update( elapsed_time, this.gamespeed, this.frames_done );

            if ( this.mouseIsDown ) {
                this.player.moveOnMouseDown( elapsed_time, this.gamespeed );
            }

            var obs_score = OBSTACLE.handleObstacles(this.obstacles, this.context, this.canvas, this.gamespeed, this.score, elapsed_time);
            this.obstacles = obs_score[0];
            this.score = obs_score[1];

            //isHit ?
            this.handleCollisions();

            //snow
            if ( this.isSnowing ) { this.snow.update(); }

            //buttons
            for (let i = 0; i < this.buttons.length; i++) {
                if( this.buttons[i].is_animated ) {
                    this.buttons[i].update();
                }
            }
        },
        handleCollisions() {
            for (let i = 0; i < this.obstacles.length; i++ ) {
                if ( UTILS.collisionCenter(this.player.pos.x, this.player.pos.y, this.player.SPRITE_SIZE_X, this.player.SPRITE_SIZE_Y, this.obstacles[i].x, this.obstacles[i].y, this.obstacles[i].width, this.obstacles[i].height, true ) && this.obstacles[i].isHit == false ) {
                    this.collisions++;
                    this.obstacles[i].isHit = true;
                    this.floatingMessages.push( 
                        new FLOATINGMESSAGE.floatingMessage( this.player.pos.x, this.player.pos.y - 100, "COLLISION", 20, 3 )
                    );
                    var alive = this.player.updateLive();
                    if ( !alive ) { //game over
                        this.gameOver();
                    }
                }
            }
        },
        render(timestamp) {
            //Computar segundos que han pasado desde la iteracion anterior
            var now = performance.now();
            //Diferencia entre frames en segundos
            var elapsed_time = ( now - this.last ) / 1000;
            this.last = now;

            //Resetear todo lo dibujado anteriormente
            this.resetCanvas( elapsed_time );

            //Actualizar datos
            this.update( elapsed_time );

            //Player
            this.player.draw(this.context);

            //Snow
            if ( this.isSnowing ) { 
                this.snow.draw( this.context );
                this.context.fillStyle = "rgba(0, 204, 204, 0.2)";
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }

            //Encabezado
            this.drawHeader();

            //Dibujar botones
            for( let i= 0; i < this.buttons.length; i++) {
                this.buttons[i].draw(this.context);
            }

            //Puntos
            this.handleScore();

            //floating messages
            this.handleFloatingMessages();

            //FPS
            this.drawFPS();

            this.display.drawImage(this.context.canvas, 0, 0, this.context.canvas.width, this.context.canvas.height, 0, 0, this.display.canvas.width, this.display.canvas.height);

            //Loop infinito
            if ( this.status ) {
                this.globalID_animation = window.requestAnimationFrame(this.render);
            }
        },
        drawHeader() {
            //Encabezado
            this.context.fillStyle = this.color_header;
            this.context.fillRect(0, 0, this.context.canvas.width, 100);
            //Texto
            this.context.font = "40px 'Press Start 2P'";
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

            this.context.font = "40px 'Press Start 2P'";
            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            this.context.fillText("FPS: " + this.frameLastSecond, 15, 200);
        },
        changeTileset( new_tileset ) {
            try {
                var tileset_img = this.getImage( require(`@/${new_tileset}`) );
                this.game_map.tileset = tileset_img;
            } catch(e) {
                console.error(new_tileset +" Not found");
            }
        },
        resetCanvas( elapsed_time ) {
            //Resetar canvas
            this.context.fillStyle = "rgba(255, 255, 255, 1)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            //Fondo
            //this.background.handleBackground(this.gamespeed, this.context);
            this.game_map.drawMap(this.gamespeed, this.context, elapsed_time);     
        },
        resetGame() {
            if ( this.status == false ) { this.continueGame(); }
            this.resetCanvas();
            this.player.reset();
            this.date_now = Date.now();
            this.status = true;
            this.score = 0;
            this.collisions = 0;
            this.obstacles.length = 0;
            this.obstacles = OBSTACLE.initObstacles(this.$refs.obstacles, this.obstacles, this.spawn_points); 
        },
        onResize() {
            this.display.canvas.height = document.documentElement.clientHeight - 0.05*document.documentElement.clientHeight;
            
            if (this.display.canvas.height > document.documentElement.clientWidth) {
                this.display.canvas.height = document.documentElement.clientWidth;
            }

            this.display.canvas.width = this.display.canvas.height * 0.9;
            this.display.imageSmoothingEnabled = false;
        },
        handleFloatingMessages() {
            for ( var i = 0; i < this.floatingMessages.length; i++) {
                this.floatingMessages[i].update();
                this.floatingMessages[i].draw( this.context );
                /*this.floatingMessages[e].lifeSpan <= .01 && (floatingMessages.splice(e, 1),
                    e--)*/
                if ( this.floatingMessages[i].life < 0.2 ) {
                    this.floatingMessages.splice(i, 1);
                }
            }
        },
        //Image manager
        getImage(url) {
            //Si la imagen ya ha sido cargado
            if( this.image_container[url] ) {
                return this.image_container[url];
            }

            //Sino, cargala y guardala
            var img = this.image_container[url] = new Image();
            img.src = url;
            return img;
        },
        checkAllLoaded() {
            if ( this.images_current = this.images_preload ) {
                console.log("FINISHED " + this.images_current + "/" + this.images_preload);
                return true;
            }
            return false;
        },
        //Pantalla que muestra el texto Loading
        loadingScreen() {
            this.context.fillStyle = "rgba(255, 255, 255, 1)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.font = "40px 'Press Start 2P'";
            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            this.context.fillText("LOADING ...", 300, 500);
            this.display.drawImage(this.context.canvas, 0, 0, this.context.canvas.width, this.context.canvas.height, 0, 0, this.display.canvas.width, this.display.canvas.height);
        }
    },
    mounted() {
        this.status = true;
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

        //Mostrar texxt Loading
        this.loadingScreen();
        
        var that = this;

        /**CREAR AL PLAYER**/
        var player_img = this.getImage( require(`@/${this.character.sprite}`) );
        player_img.addEventListener("load", function(event) {// When the load event fires, do this:
            that.player = new PLAYER.Player(player_img, that.character.animation, that.character.frames, that.character.sprite_size_x, that.character.sprite_size_y );
            //Set de animaciones inicial
            that.player.setAnimation(that.player.BACK);
            //Offset del player
            that.player.offset = { x: -that.player.SPRITE_SIZE_X/2 , y: -that.player.SPRITE_SIZE_Y/2 };
            console.log("PLAYER LOADED");
            that.images_current++;
        });
        

        /**BOTONES**/
        var pause_img = this.getImage( require(`@/assets/button.png`) );
        var reset_img = this.getImage( require(`@/assets/reset.png`) );
        
        pause_img.addEventListener("load", function(event) { 
            that.pause_button = new BUTTON.Button(pause_img, 900, 10, 80, 80, 128, false, 2, false); 
            that.buttons.push(that.pause_button);
            console.log("PAUSE LOADED");
            that.images_current++;
        });
        reset_img.addEventListener("load", function(event) { 
            that.reset_button = new BUTTON.Button(reset_img, 800, 10, 80, 80, 128, false, 2, false);
            that.buttons.push(that.reset_button);
            console.log("RESET LOADED");
            that.images_current++;
        });

        /**HABILIDAD**/
        if ( this.character.has_ability ) {
            var ability_img = this.getImage( require(`@/assets/ability_snow.png`) );
            ability_img.addEventListener("load", function(event) { 
                that.ability_button = new BUTTON.Button(ability_img, 880, 110, 100, 100, 125, false, 31, true);
                that.buttons.push(that.ability_button);
                console.log("ABILITY LOADED");
                that.images_current++;
            });
        } else {
            this.images_preload--;
        }
        
        //this.buttons.push(this.pause_button, this.reset_button, this.ability_button);

        /**FONDO DEL JUEGO**/
        var bg_img = this.getImage( require(`@/assets/BG.png`) );
        bg_img.addEventListener("load", function(event) { 
            that.background = new BACKGROUND.Background(bg_img, that.canvas);
            console.log("BG LOADED");
            that.images_current++;
        });
        

        /**OBSTACULOS**/
        var obs_img = this.getImage( require(`@/assets/obstacles.png`) );
        obs_img.addEventListener("load", function(event) { 
            that.obstacles = OBSTACLE.initObstacles(obs_img, that.obstacles, that.spawn_points);
            console.log("OBSTACLES LOADED");
            that.images_current++;
        });
        
        /**COLLISION**/
        //this.collision_image = this.$refs.collision;

        /**MAPA**/
        this.maps = this.character.map;
        this.current_map = MAPS[ this.maps[0] ].map;
        this.tileset = MAPS[ this.maps[0] ].tileset;
        
        var tileset_img = this.getImage( require(`@/${this.tileset}`) );
        tileset_img.addEventListener("load", function(event) { 
            that.game_map = new GAMEMAP.Gamemap(tileset_img, that.current_map, that.canvas);
            console.log("TILESET LOADED");
            that.images_current++;
        });

        /**SNOW**/
        this.isSnowing = this.current_map == 1 ? true : false;
        if ( this.isSnowing ) { 
            this.snow = new SNOW.Snow( this.canvas.width, this.canvas.height );
            this.snow.createSnowParticles();
        }

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
        this.display_canvas.addEventListener('touchstart', this.mousedown, {passive: true});
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
        this.last = performance.now();
        this.finish = setInterval( function () {
            if( that.checkAllLoaded() ) {
                that.globalID_animation = window.requestAnimationFrame(that.render);
                clearInterval(that.finish);
            }
        }, 1000);

    },
    unmount() {
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
        this.status = false;
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
    font-family: "Press Start 2P";
}
</style>