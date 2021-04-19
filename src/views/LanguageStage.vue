<!--SELECT A LANGUAGE SCREEN-->
<template>
    <div class="turorial-div">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <div class="panel">
            <div class="languages">
                <button v-for="(language, index) in languages" :key="index" class="btn btn-pointer" @click="changeLanguage( language.id )"
                :style="{ backgroundImage: 'url(' + require(`@/${ language.image }`) + ')' }">
                    {{language.screen_name}}
                  </button>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES as stages_constants, LANGUAGES as languages_constants } from '@/consts.js';

export default {
    name: 'LanguageStage',
    data() {
        return {
            destination: stages_constants.PLAY_STAGE,
            id: stages_constants.LANGUAGE_STAGE,
            languages: languages_constants
        }
    },
    computed: {
        ...mapState( ['stage', 'language'] )
    },
    methods: {
        changeLanguage( id ) {
            this.$store.commit( 'changeLanguage', id );
            this.changeState( this.destination );
        },
        changeState(mydestination) {
            this.$store.commit('changeState', { index: this.id, destination: mydestination})
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Press Start 2P', 'Carter One', 'arial';
}

.turorial-div {
    position: absolute;
    align-content: center;
    background: url('~@/assets/BG_language.png');
    background-size: cover;
    background-repeat: no-repeat;
    image-rendering: pixelated;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
}

h1 {
    text-transform: capitalize;
    font-size: 4vh;
}

.panel {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    
    display: grid;
    grid-template-rows: 100%;
    grid-template-areas: 
        "languages";
    height: 95vh;
    width: 90vw;
    max-width: 600px;
    max-height: 95vh;
    border-radius: 10px;

    margin: 0;
    padding: 0;

    /* border: 3px solid black;
    background: rgb(255, 255, 255);  */
    
}

.title {
    grid-area: title;
}   

.languages {
    grid-area: languages;
    
    display: grid;
    grid-template-rows: auto;
    grid-row-gap: 10px;
}

.btn {
    width: 100%;
    height: 100%;
    text-transform: uppercase;

    outline: none;
    border: none;
    border-radius: 20px;

    color: #fff;
    cursor: pointer;
    
    /*background: rgb(113, 235, 178);*/
    /* cursor: pointer;  */
    border: 3px solid rgb(255, 255, 255);
    font-size: 2.5vh;

    font-family: 'Press Start 2P', sans-serif;
    letter-spacing: 1px;

    background-size: cover;
    background-position: center center;
}

.btn:hover {
    opacity: 0.6;
    background-size: cover;
}

</style>