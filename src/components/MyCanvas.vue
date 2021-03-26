<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

    <canvas id="canvas"></canvas>
    
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES, CHARACTERS, LEVELS, MAPS, AUDIO_FILES } from '@/consts.js';
import * as PLAYER from '../game/player.js';
import * as BUTTON from '../game/button.js';
import * as BACKGROUND from '../game/background.js';
import * as ABILITY from '../game/ability.js';
import * as OBSTACLE from '../game/obstacles.js';
import * as EXPLOSION from '../game/explosion.js';
import * as RESOURCE from '../game/resources.js';
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
            obstacles_interval: 100,    //separacion entre obstaculos
            obs_img: null,
            obs_minY: 999,
            obs_minX: 999,
            explosions: [],
            explosion_imgs: [],
            obs_sizeX: 250,
            obs_sizeY: 225,
            collision_audio_src: AUDIO_FILES.AUDIO_COLLISION,

            /**RESOURCES**/
            resources: [],
            resources_interval: 400,
            res_img: null,
            resource_audio_src: AUDIO_FILES.AUDIO_RESOURCE,

            /**ABILITY**/
            ability: null,
            ability_isActive: false,
            ability_quiz: false,

            /**NIVEL**/
            //level: LEVELS[ this.$props['levelID'] ],
            //tileset: LEVELS[ this.$props['levelID'] ].tileset,
            tileset_snow: false,
            level: 0,

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

            /**PUNTOS**/
            score: 0,
            bonus_score: 0,

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
            
            background: null,       //fondo
            
            collisions: 0,
            collision_image: null,
            last: 0,                //timestamp frame anterior
            color_header: "rgba(250, 200, 200, 1)",
            ability_button: null,
            image_container: {},
            images_preload: 11,
            images_current: 0,
            finish: null,
            full_size: false,
            ratio: 1,

            /**FRAMES**/
            total_frames: 0,
            //Cicle
            frames_done: 0,
            frameLastSecond: 0,

            /**TILEMAP**/
            game_map: null,
            current_sec: 0,

            /**FLOATING MESSAGES**/
            floatingMessages: [],

            /**LIVES**/
            heart_img: null,

            /**AUDIO**/
            pickResource: null,
            collisionSound: null
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
            this.clearObstacles();
            this.clearResources();
        },
        gameOver() {
            this.status = false;
            document.dispatchEvent(this.pause_event);
            //this.cancelAnimation();
            //this.pauseGame();
            //cancelAnimationFrame(this.globalID_animation);
            var msg = { score: this.score, bonus: this.bonus_score, character: this.$props['characterID'], level: this.$props['levelID'], time: this.active_time };
            this.$emit( 'gameOver', JSON.stringify( msg ) );       
        },
        handleBonus( bonus ) {
            var data = JSON.parse( bonus );
            this.bonus_score += data.bonus;
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
                    this.$emit('openQuiz', JSON.stringify( {ability: this.ability_quiz} ));
                    
                } else if ( this.character.has_ability ) {
                    if ( this.ability_button.isHit(x,y) ) {
                        this.ability_isActive = !this.ability_isActive;
                        switch (this.character.ability) {
                            case "Darkness":
                                this.ability.type = 1;
                                this.ability.color = "rgba(204, 153, 0, 0.2)";
                               // this.ability.color = "rgba(0, 0, 0, 0.4)";
                                break;
                            default:
                                if (this.tileset_snow) { 
                                    this.changeTileset( MAPS[ LEVELS[this.level].map ].tileset );
                                    this.tileset_snow = false;
                                    this.gamespeed = 4;
                                    this.isSnowing = false;
                                    this.player.changeParticleColor( "rgba(0,0,0,");
                                    this.color_header = "rgba(250, 200, 200, 1)";
                                    this.ability_button.active = false;
                                } else {
                                    var m = this.level == 2 ? 3 : 1;
                                    this.changeTileset( MAPS[ m ].tileset );
                                    this.tileset_snow = true;
                                    this.gamespeed = 2;
                                    this.isSnowing = true;
                                    this.snow = new SNOW.Snow( this.canvas.width, this.canvas.height );
                                    this.snow.createSnowParticles();
                                    this.player.changeParticleColor( "rgba(255,255,255,");
                                    this.color_header = "rgba(150, 220, 240, 1)";
                                    this.ability_button.active = true;
                                }
                                break;
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
                    case 83:    // S
                        this.full_size = !this.full_size;
                        this.onResize();
                        break;
                    default:
                        //console.log( event.keyCode)
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
            //var img = this.getImage( require(`@/assets/heart.png`) );
            UTILS.drawImageAtPoint(this.context, this.heart_img, 0, 0, 128, 128, 700, 50, 120, 120);
            this.context.fillText(this.player.lives, 682, 72);
        },
        //Se llama en cada ciclo del juego
        update( elapsed_time ) {
            //Player
            this.player.update( elapsed_time, this.gamespeed, this.frames_done );

            if ( this.mouseIsDown ) {
                this.player.moveOnMouseDown( elapsed_time, this.gamespeed );
            }

            this.handleObstacles( elapsed_time );

            this.handleResources( elapsed_time );

            //isHit ?
            this.handleCollisions();

            this.handleExplosions();

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
            //Obstacles
            for (let i = 0; i < this.obstacles.length; i++ ) {
                if ( this.obstacles[i].isEnd || this.obstacles[i].isHit ) {
                    continue;
                }

                if ( UTILS.collisionCenter(this.player.pos.x, this.player.pos.y, this.player.SPRITE_SIZE_X, this.player.SPRITE_SIZE_Y, this.obstacles[i].x, this.obstacles[i].y, this.obstacles[i].swidth, this.obstacles[i].sheight, true ) && this.obstacles[i].isHit == false ) {
                    this.collisions++;
                    this.obstacles[i].isHit = true;
                    this.obstacles[i].show = false;

                    var explosion_rnd = Math.floor(Math.random() * this.explosion_imgs.length);
                    this.collisionSound.play();
                    this.explosions.push(
                        new EXPLOSION.Explosion( this.explosion_imgs[explosion_rnd], this.obstacles[i].x, this.obstacles[i].y, 250, 250, 250)
                    );

                    var alive = this.player.updateLive();
                    if ( !alive ) { //game over
                        this.gameOver();
                    }
                }
            }

            //Resources
            for (let i = 0; i < this.resources.length; i++ ) {
                if ( this.resources[i].isEnd || this.resources[i].isHit ) {
                    continue;
                }

                if ( UTILS.collisionCenter(this.player.pos.x, this.player.pos.y, this.player.SPRITE_SIZE_X, this.player.SPRITE_SIZE_Y, this.resources[i].x, this.resources[i].y, this.resources[i].width, this.resources[i].height, true ) && this.resources[i].isHit == false ) {
                    this.resources[i].isHit = true;
                    this.pickResource.play();
                    
                    if ( this.resources[i].type == "QUIZ" ) {
                        this.status = false;
                        document.dispatchEvent(this.pause_event);
                        this.$emit('openQuiz', JSON.stringify( {ability: this.ability_quiz} ));
                    } else if ( this.resources[i].type == "HEALTH" ) {
                        this.player.increaseLive();
                    }
                }
            }
        },
        handleObstacles( elapsed_time ) {
            this.obs_minY = 999;
            //this.obs_minX = 999;

            for (let i = 0; i < this.obstacles.length; i++ ) {
                if ( this.obstacles[i] == null ) {
                    continue;
                }

                if ( this.obstacles[i].isEnd ) {
                    continue;
                }

                var prev_score = this.score;
                this.score = this.obstacles[i].update(this.gamespeed, this.canvas, this.score, elapsed_time);
                this.obstacles[i].draw(this.context);

                if ( prev_score != this.score ) {
                    this.floatingMessages.push( 
                        new FLOATINGMESSAGE.floatingMessage( this.obstacles[i].x, this.player.pos.y - 100, "+1", 20, 3, "rgba(0, 0, 0," )
                    );
                }

                if ( this.obstacles[i].y < this.obs_minY ) {
                    this.obs_minY = this.obstacles[i].y;
                    this.obs_minX = this.obstacles[i].x;
                }
                
                //Lo elimina pero produce un blink en la pantalla ya que se ha de rehacer el array
                /*if ( this.obstacles[i].isEnd ) {
                        this.obstacles.splice( i, 1 );
                    }*/
            }

            if ( this.total_frames % this.obstacles_interval == 0 ) {
                var obs = OBSTACLE.createObstacle( this.obs_img, this.obs_sizeX, this.obs_sizeY, this.spawn_points, this.level, this.obs_minY, this.obs_minX, false );
                if ( obs != null ) {
                    this.obstacles.push( obs );

                    var rnd = Math.floor( Math.random() * 2)

                    if ( this.levelID == 2 && rnd == 0 ){
                        var x = obs.x;
                        var y = obs.y;

                        var obs2 = OBSTACLE.createObstacle( this.obs_img, this.obs_sizeX, this.obs_sizeY, this.spawn_points, this.level, y, x, true );
                        if ( obs2 != null ) {
                            this.obstacles.push( obs2 );
                        }
                    }
                }

                if ( this.obstacles_interval > 50) { 
                    this.obstacles_interval -= 50; 
                }
            }
        },
        clearObstacles() {
            for (let i = 0; i < this.obstacles.length; i++ ) {
                if ( this.obstacles[i].isEnd || this.obstacles[i].isHit ) {
                    this.obstacles.splice( i, 1 );
                    i--;
                }
            }
        },
        handleResources( elapsed_time ) {
            for (let i = 0; i < this.resources.length; i++ ) {
                if ( this.resources[i] == null ) {
                    continue;
                }

               if ( this.resources[i].isEnd || this.resources[i].isHit ) {
                    continue;
                }

                this.resources[i].update(this.gamespeed, this.canvas, elapsed_time);
                this.resources[i].draw(this.context);
            }

            if ( this.total_frames % this.resources_interval == 0 && this.active_time >= 5 ) {
                var res = RESOURCE.createResource( this.res_img, this.spawn_points, this.obs_minY );
                if ( res != null ) {
                    this.resources.push( res );
                }
            }
            
        },
        clearResources() {
            for (let i = 0; i < this.resources.length; i++ ) {
                if ( this.resources[i].isEnd || this.resources[i].isHit ) {
                    this.resources.splice( i, 1 );
                    i--;
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

            if ( this.ability_isActive ) {
                //Snow
                if ( this.isSnowing ) { 
                    this.snow.draw( this.context );
                }
                
                this.ability.draw( this.context, this.canvas, this.player.pos );
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

            this.total_frames++;

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
            this.obstacles = OBSTACLE.initObstacles( this.obs_img, this.obs_sizeX, this.obs_sizeY, this.obstacles, this.spawn_points); 
        },
        onResize() {
            if ( this.full_size ) {
                this.display.canvas.height = window.innerHeight;
                this.display.canvas.width = window.innerWidth;
            } else {
                this.display.canvas.height = document.documentElement.clientHeight - 0.05*document.documentElement.clientHeight;
                
                if (this.display.canvas.height > document.documentElement.clientWidth) {
                    this.display.canvas.height = document.documentElement.clientWidth;
                }

                this.display.canvas.width = this.display.canvas.height * 0.95;
                this.display.imageSmoothingEnabled = false;
            }

            this.ratio = this.display.canvas.width / this.display.canvas.height;
        },
        handleFloatingMessages() {
            for ( var i = 0; i < this.floatingMessages.length; i++) {
                this.floatingMessages[i].update();
                this.floatingMessages[i].draw( this.context );

                if ( this.floatingMessages[i].life < 0.2 ) {
                    this.floatingMessages.splice(i, 1);
                }
            }
        },
        handleExplosions() {
            for ( var e = 0; e < this.explosions.length; e++ ) {
                this.explosions[e].update();
                this.explosions[e].draw( this.context );

                if ( this.explosions[e].current_frame >= 7 ) {
                    this.explosions.splice(e, 1);
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
        var regex =  /iPhone|iPad|iPod|Android/i;
        var isMobile = regex.test(navigator.userAgent);
        if ( isMobile ) {
            //console.log( "IS MOBILE");
            this.full_size = true;
            document.getElementById( "canvas" ).style.setProperty( "margin", "0" );
        } else {
            //console.log( "IS DESKTOP");
            this.full_size = false;
        }
        this.status = true;
        /**INSTANCIAR VARIABLES INICIALES**/
        this.canvas  = document.createElement("canvas");
        this.context = this.canvas.getContext('2d', {alpha: false} );
        this.display_canvas = document.querySelector("canvas");
        this.display = document.querySelector("canvas").getContext("2d", {alpha: false} );
        this.context.imageSmoothingEnabled = false;
        this.display.imageSmoothingEnabled = false;
        //Dimensiones iniciales
        this.context.canvas.width = 1000;
        this.context.canvas.height = 1000;
        //Redimensionar para ajustar tamaño
        this.onResize();

        //Mostrar texxt Loading
        this.loadingScreen();

        this.level = this.$props['levelID'];
        
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
            
            var ability_img;
            switch( this.character.ability ) {
                case "Darkness":
                    console.log("Darkness ability");
                    ability_img = this.getImage( require(`@/assets/ability_snow.png`) );
                    break;
                case "Quiz":
                    ability_img = this.getImage( require(`@/assets/ability_snow.png`) );
                    this.ability_quiz = true;
                    break;
                default:    //Snow
                    ability_img = this.getImage( require(`@/assets/ability_snow.png`) );
                    break;
            }
            ability_img.addEventListener("load", function(event) { 
                that.ability_button = new BUTTON.Button(ability_img, 880, 110, 100, 100, 125, false, 31, true);
                that.ability = new ABILITY.Ability( ability_img );
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
        this.obs_img = this.getImage( require(`@/assets/obstacles.png`) );
        this.obs_img.addEventListener("load", function(event) { 
            //that.obstacles = OBSTACLE.initObstacles(that.obs_img, that.obstacles, that.spawn_points, that.level);
            console.log("OBSTACLES LOADED");
            that.images_current++;
        });

        /**EXPLOSION**/
        var explosion_img1 = this.getImage( require(`@/assets/explosion1.png`) );
        explosion_img1.addEventListener("load", function(event) { 
            that.explosion_imgs.push( explosion_img1 );
            console.log("EXPLOSION 1 LOADED");
            that.images_current++;
        });

        var explosion_img2 = this.getImage( require(`@/assets/explosion2.png`) );
        explosion_img2.addEventListener("load", function(event) { 
            that.explosion_imgs.push( explosion_img2 );
            console.log("EXPLOSION 1 LOADED");
            that.images_current++;
        });

        /**RESOURCES**/
        this.res_img = this.getImage( require(`@/assets/resources.png`) );
        this.res_img.addEventListener("load", function(event) { 
            console.log("RESOURCES LOADED");
            that.images_current++;
        });

        /**LIVES**/
        this.heart_img = this.getImage( require(`@/assets/heart.png`) );
        this.heart_img.addEventListener("load", function(event) { 
            console.log("HEART LOADED");
            that.images_current++;
        });
        
        /**AUDIO**/
        this.pickResource = new Audio( require(`@/${this.resource_audio_src}`));
        this.pickResource.volume = 0.1;
        this.collisionSound = new Audio( require(`@/${this.collision_audio_src}`) );
        this.collisionSound.volume = 0.1;

        /**MAPA**/
        this.maps = LEVELS[this.level].map;
        this.current_map = MAPS[ this.maps[0] ].map;
        this.tileset = MAPS[ this.maps[0] ].tileset;

        
        var tileset_img = this.getImage( require(`@/${this.tileset}`) );
        tileset_img.addEventListener("load", function(event) { 
            that.game_map = new GAMEMAP.Gamemap(tileset_img, that.current_map, that.canvas);
            console.log("TILESET LOADED");
            that.images_current++;
        });

        if ( this.level == 2 ) {
            this.spawn_points = {
                total: 4,           //cuantos puntos de aparicion hay
                points: [200, 400, 600, 800]
            };
            this.obs_sizeX = 160;
            this.obs_sizeY = 130;
        }

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