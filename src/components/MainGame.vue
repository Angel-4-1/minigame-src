<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
<!--Otras letras: Wendy One, Acme, Coiny, Righteous, Lilita One-->

<div v-bind:class="[isPaused || isQuiz ? blurClass : '', bkClass]">
    <div class="container">
        <MyCanvas ref="myCanvas"
            :characterID="characterID" 
            :levelID="levelID"
            @openPauseMenu="openPauseMenu"
            @openQuiz="openQuiz"
            @gameOver="gameOver" />
    </div>
</div>

<transition name="zoom">
    <PauseMenu v-if="isGamePaused()"
        :isPaused="isPaused"
        @closePauseMenu="closePauseMenu"
        @resetGame="resetGame"
        @quitGame="quitGame" />
</transition>

<transition name="zoom">
    <QuizQuestion v-if="isQuizTime()"
        :isQuiz="isQuiz"
        @closeQuiz="closeQuiz"/>
</transition>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES, CHARACTERS, LEVELS } from '@/consts.js';
import MyCanvas from '@/components/MyCanvas.vue';
import PauseMenu from '@/components/PauseMenu.vue';
import QuizQuestion from '@/components/QuizQuestion.vue';

export default {
    name: 'MainGame',
    components: {
        MyCanvas,
        PauseMenu,
        QuizQuestion
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
            isPaused: false,
            isQuiz: false,
            bkClass: 'bk',
            blurClass: 'blur'
        }
    },
    computed: {
        ...mapState( ['stage'] )
    },
    methods: {
        gameOver( data ) {
            this.$emit('gameIsOver', data );
        },
        isGamePaused() {
            return this.isPaused;
        },
        openPauseMenu() {
            this.isPaused = true;
        },
        closePauseMenu() {
            this.isPaused = false;
            this.$refs.myCanvas.continueGame();
        },
        isQuizTime() {
            return this.isQuiz;
        },
        closeQuiz() {
            //sumar puntos si la respuesta es buena o guardarlos y al final se suman
            this.isQuiz = false;
            this.$refs.myCanvas.continueGame();
        },
        openQuiz() {
            this.isQuiz = true;
        },
        resetGame() {
            this.isPaused = false;
            this.$refs.myCanvas.resetGame();
        },
        quitGame() {
            this.isPaused = false;
            console.log("QUIT GAME")
        }
    },
    created() {
        this.isPaused = false;
    },
    mounted() {
                
    },
    beforeUnmount() { 
        
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


.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}


.bk {
  transition: all 0.25s ease-out;
}

.blur {
  filter: grayscale(.75) blur(3px);
  /*Desactivar botones y cualquier interaccion posible*/
  pointer-events: none;
}

</style>