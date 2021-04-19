<!-- OBSTACLES MENU -->
<template>
    <div class="obstacles-menu">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <div class="obstacles-header">
            <h1>{{ titles.TITLE_OBSTACLES[language_id] }}</h1>
        </div>

        <div class="obstacles-info">
            <div v-for="(obs, index) in obstacles" :key="index">
                <div class="obstacle-detail">
                    <img class="detail-image" :src="require(`@/${obs.icon}`)" alt="Obs image">
                    <div class="detail-content">
                        <div class="detail-title">
                            <h3>{{ obs.name[language_id] }}</h3>
                        </div>
                        <div class="detail-description">
                            <p>{{ obs.info[language_id] }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Botones parte inferior -->
        <div class="obstacles-buttons">
            <button class="btn btn-pointer" @click="closeMenu">{{ buttons.BUTTON_PAUSE_RESUME[language_id] }}</button>
        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { BUTTONS, TITLES, OBSTACLES_INFO } from '@/consts.js';

export default {
    name: 'ObstaclesMenu',
    emits: [                //aquello que emitimos al padre
        'closeObstaclesMenu'
    ],    
    data() {
        return {
            language_id: 0,
            buttons: BUTTONS,
            titles: TITLES,
            obstacles: OBSTACLES_INFO
        }
    },
    computed: {
        ...mapState( ['language'] )
    },
    methods: {
        closeMenu() { //salir del menu de pausa
            this.show = false;
            this.$emit('closeObstaclesMenu');
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
    font-family: 'Press Start 2P', 'arial';
}

h1 {
    text-transform: capitalize;
    font-size: min( 5vw, 30px);
}

/*RECUADRO BLANCO*/
.obstacles-menu {
    position: relative;
    width: 100%;
    height: 70vh;
    max-width: 600px;
    max-height: 650px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 5%;

    display: grid;
    grid-template-rows: 15% 65% 20%;
    grid-template-areas: 
        "header"
        "info"
        "buttons";

    padding: 5px;
    border: 3px solid black;
}

.obstacles-header {
    grid-area: header;
}

.obstacles-info {
    grid-area: info;
    overflow-y: auto;
}

/*DETAIL*/
.obstacle-detail {
    display: grid;
    grid-template-columns: 24% 74%;
    grid-template-areas: "image description";
    grid-column-gap: 2%;
    height: 20vh;
    padding: 1%;
    /* margin-bottom: 1%; */
    /* border-bottom: 2px solid black; */
}

.detail-image {
    grid-area: image;
    object-fit: cover;
    width: 95%;
}

.detail-content {
    grid-area: description;
    display: grid;
    grid-template-rows: 23% 77%;
    grid-template-areas: 
        "header"
        "property-data";
    text-align: justify;
    overflow-y: auto;
}

.detail-title {
    grid-area: header;
}

.detail-title h3 {
    border-bottom: 3px solid rgb(0, 0, 0);
    margin:0;
    font-size: min( 3vw, 20px);
}

.detail-description {
    grid-area: property-data;
}

.detail-description p {
    margin:0;
    font-size: min( 2.8vw, 16px);
}

/*PROGRESS BAR*/
.detail-content::-webkit-scrollbar {
    width: 10px;
    background: rgba(255, 255, 255, 0.05);
}

.detail-content::-webkit-scrollbar-thumb {
    background: rgba(128, 128, 128, 0.25);
    border-radius: 10px;
}

.detail-content::-webkit-scrollbar-thumb:hover {
    background: rgba(128, 128, 128, 0.63);
    border-radius: 10px;
}

/*BOTONES*/
.obstacles-buttons {
    grid-area: buttons;

    display: grid;
    grid-template-rows: auto;
    grid-row-gap: 10px;
    padding: 2%;
}

/*FORMATO BOTONES*/
.obstacles-buttons .btn {
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

.obstacles-buttons .btn:hover {
    background: rgb(62, 138, 102);
    color: white;
}

</style>