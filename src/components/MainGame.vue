<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
<!--Otras letras: Wendy One, Acme, Coiny, Righteous, Lilita One-->

    <div class="container">
        <CanvasExample :characterID="characterID" />
        <!--
        <div class="header">
            <div class="header-left"></div>
            <div class="puntuation">
                <h1>Score: {{ points }}</h1>
            </div>
            <div class="header-right"></div>
        </div>
        
        <div class="main">
        
            <button @click="gameOver">Finish Game</button>
            <h2>Character</h2> <h2>{{ character }}</h2>
            <h2>Level</h2> <h2>{{ level }}</h2>
            <span class="sprite" :style="{'background-image': 'url(' + require('@/assets/characters/spritesheet.png') + ')'}" ></span>
        
        <div class="aspect-ratio-box">
            <div class="aspect-ratio-box-inside">
                <div class="flexbox-centering">
                    <div class="viewport-sizing">
                        <h1>Main Game HERE</h1>
                        <div id="sprite" :style="{ 'background': 'url(' + require('@/assets/characters/sprite-ex.png') + ')','background-position': `${animation[currentFrame].x * -32}px ${animation[currentFrame].y * -32}px`}"></div>
                        
                        <h2> H: {{ windowHeight }}  W: {{ windowWidth }} </h2>
                    </div>
                </div>
            </div>
        </div>
        -->

        <!--
            <div class="main-character">
                <div id="sprite" :style="{ 'background': 'url(' + require('@/assets/characters/spritesheet.png') + ')','background-position': `${animation[currentFrame].x * -sprite_width}px ${animation[currentFrame].y * -sprite_height}px`}"></div>
                -->
                <!-- x 14     y 18 -->
            <!--
            </div>
        </div>

        <div class="bottom"></div>
        -->
    </div>
    
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES, CHARACTERS, LEVELS } from '@/consts.js';
import CanvasExample from '@/components/CanvasExample.vue'

export default {
    name: 'MainGame',
    components: {
        CanvasExample
    },
    props: [
        'levelID',
        'characterID'
    ],
    emits: ['gameIsOver'], //lo que esta emitiendo a otros componentes
    data() {
        return {
            points: 0,
            level: LEVELS[ this.$props['levelID'] ],
            character: CHARACTERS[ this.$props['characterID'] ],
            start: undefined,
            animation: [
                //Delante
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 },
                { x: 3, y: 0 }
                //Derecha
                //Izquierda
                //Detras
                
            ],
            sprite_width: 14,
            sprite_height: 18,
            currentFrame: 0,
            frames: 4,
            speed: 100,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        }
    },
    computed: {
        ...mapState( ['stage'] )
    },
    methods: {
        gameOver() {
            this.$emit('gameIsOver');
        },
        steps(timestamp) {
            if (this.start === undefined) {
                this.start = timestamp
            }
            const elapsed = timestamp - this.start
            if (elapsed >= this.speed) {
                 this.start = timestamp
                    this.currentFrame++
                if (this.currentFrame >= this.frames) {
                    this.currentFrame = 0
                }
            }

            window.requestAnimationFrame(this.steps)
        },
        onResize() {
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
            let aspect_ratio = this.windowHeight / this.windowWidth;
            //let sp = document.getElementById("sprite");
            //sp.style.zoom = Math.max( 5 / aspect_ratio, 5);
        }
    },
    created() {
        window.requestAnimationFrame(this.steps)
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    beforeUnmount() { 
        window.removeEventListener('resize', this.onResize); 
    }
}
</script>

<style scoped>
.container {
    height: 100vh;
    padding: 1vh;
    /*width: calc(100% - 20px);*/
    /*min-height: calc(100vh - 20px);*/
    background: radial-gradient(#7a1599, #500a44);
    font-family: 'Carter One', arial;
    font-size: 1rem;
    font-weight: normal;
}

h1, h2 {
    color: #ffffff;
}

.header {
    height: 5vh;
    background: white;
    display: flex;
    flex-direction: row;
}
.main {
    height: 88vh;
    background: rgb(235, 235, 142);
}

.main .main-character {
    background: red;
    position: relative;
    transform: translate(-50%, -50%);
    top: 90%;
    left: 50%;
}

.bottom {
    height: 5vh;
    background: chartreuse;
}

.header-left {
    width: 25vw;
    background: red;
}

.puntuation {
    margin: auto;   /* centrarlo verticalmente */
    width: 50vw;
    background: cyan;
    height: 5vh;
    text-align: center;
}

.puntuation h1 {
    margin: 0;
    font-size: calc(10px + 2vw);
}

.header-right {
    width: 25vw;
    background: chartreuse;
}

#sprite {
    image-rendering: pixelated;
    width: 14px; /*14px*/
    height: 18px; /*18px*/
    zoom: 10;
    background: url('http://localhost:8080/0-143-0-0.bmp');
    display: inline-block;
    align-self: center;
}


/*
.aspect-ratio-box {
  height: 0;
  padding-top: 591.44px / 1127.34px * 100%;
  background: white;
  position: relative;
  width: 100%;
}

.aspect-ratio-box-inside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.flexbox-centering {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.viewport-sizing {
  font-size: 2vw;
}
*/
</style>