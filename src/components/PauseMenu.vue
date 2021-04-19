<!-- PAUSE MENU -->
<template>


    <div class="pause-container">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <div class="pause-menu" v-if="show">

            <div class="pause-header">
                <h1>{{ titles.TITLE_PAUSE[language_id] }}</h1>
            </div>

            <!-- Botones parte inferior -->
            <div class="pause-buttons">
                <button class="btn btn-pointer" @click="closeMenu">{{ buttons.BUTTON_PAUSE_RESUME[language_id] }}</button>
                <button class="btn btn-pointer" @click="reset">{{ buttons.BUTTON_PAUSE_RESET[language_id] }}</button>
                <button class="btn btn-pointer" @click="openObstaclesMenu">{{ buttons.BUTTON_PAUSE_OBSTACLES[language_id] }}</button>
                <button class="btn btn-quit btn-pointer" @click="quit">{{ buttons.BUTTON_PAUSE_EXIT[language_id] }}</button>
                <!--
                    <button class="btn btn-close" @click="closeDetail"></button>
                -->
            </div>
            
        </div>

        <ObstaclesMenu v-if="isObstaclesPressed()"
            @closeObstaclesMenu="closeObstaclesMenu"/>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { BUTTONS, TITLES } from '@/consts.js';
import ObstaclesMenu from '@/components/ObstaclesMenu.vue';

export default {
    name: 'PauseMenu',
    emits: [                //aquello que emitimos al padre
        'closePauseMenu',
        'resetGame',
        'quitGame' 
    ],
    components: {
        ObstaclesMenu,
    },
    props: [ 'isPaused' ],
    data() {
        return {
            show: this.$props['isPaused'],
            language_id: 0,
            buttons: BUTTONS,
            titles: TITLES,
            showObstacles: false
        }
    },
    computed: {
        ...mapState( ['stage' , 'language'] )
    },
    methods: {
        closeMenu() { //salir del menu de pausa
            this.show = false;
            this.$emit('closePauseMenu');
        },
        reset() {
            this.show = false;
            this.$emit('resetGame');
        },
        quit() {
            this.closeMenu();
            this.$emit('quitGame');
        },
        openObstaclesMenu() {
            this.showObstacles = true;
            this.show = false;
        },
        isObstaclesPressed() {
            return this.showObstacles;
        },
        closeObstaclesMenu() {
            this.showObstacles = false;
            this.show = true;
        }
    },
    mounted() {
        this.language_id = this.language.id;
    },
    created() {
        this.show = true;
    }
}
</script>

<style scoped>
* {
    font-family: 'Press Start 2P', 'Carter One', 'arial';
}
h1 {
    text-transform: capitalize;
    font-size: 5vh;
}

/*CONTENEDOR PRINCIPAL*/
.pause-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /*flex-direction: column;*/
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /*background: rgba(0,0,0,.7); /*Oscurecer el fondo*/
    
}

/*RECUADRO BLANCO*/
.pause-menu {
    position: relative;
    width: 100%;
    height: 70vh;
    max-width: 600px;
    max-height: 650px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 5%;

    display: grid;
    grid-template-rows: 15% 85%;
    grid-template-areas: 
        "header"
        "buttons";

    padding: 5px;
    border: 3px solid black;
}

.pause-header {
    grid-area: header;
}


/*BOTONES*/
.pause-buttons {
    grid-area: buttons;

    display: grid;
    grid-template-rows: auto auto auto;
    grid-row-gap: 10px;
    padding: 2%;
}

/*FORMATO BOTONES*/
.pause-buttons .btn {
    outline: none;
    border: none;
    border-radius: 20px;
    color: #000;    
    background: rgb(113, 235, 178);
    border: 3px solid rgb(255, 255, 255);
    font-size: 2vh;
    font-family: 'Press Start 2P', sans-serif;
    letter-spacing: 1px;
}

.pause-buttons .btn:hover {
    background: rgb(62, 138, 102);
    color: white;
}

/*BOTON PARA CERRAR*/
.pause-buttons .btn-quit {
    background: rgb(236, 131, 131);
}

.pause-buttons .btn-quit:hover {
    background: rgb(235, 34, 34);
    color: white;
}

</style>