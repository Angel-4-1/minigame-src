<!--INTRO STAGE-->

<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <div class="introstage-div">
        <h1>Defend your</h1>
        <h1>privacy</h1>
        <button class="btn-start blinking" @click="changeState(destination)">START</button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';

export default {
    name: 'IntroStage',
    data() {
        return {
            destination: stages_constants.TUTORIAL_STAGE,
            id: stages_constants.INTRO_STAGE
        }
    },
    computed: {
        ...mapState( ['stage'])
    },
    methods: {
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

.introstage-div{
    position: relative;
    align-content: center;
    padding: 10px;
    background: #f88f8f;
    height: 100vh;
    /* font-family: 'Carter One', arial; */
}
.btn-play {
    position: absolute;
    /*queda colocado respecto a uno de los vertices*/
    left: 50%;
    /*colocarlo bien*/
    transform: translate(-50%, -50%);
    bottom: 20%;

    padding: 10px;
    
    text-decoration: none;
    color: #000000;
    padding: 10px;
    margin-top: 10px;
    font-size: 1.5rem;
    cursor: pointer;

    outline: none;
    border: none;
    border-radius: 20px;
    background: rgb(122, 235, 235);
    border: 3px solid rgb(255, 255, 255);
    font-size: 3vh;
}

.btn-play:hover {
    background: rgb(106, 141, 236);
    color: white;
}

.btn-start {
    position: absolute;
    /*queda colocado respecto a uno de los vertices*/
    left: 50%;
    /*colocarlo bien*/
    transform: translate(-50%, -50%);
    bottom: 20%;

    background: none;
    border: none;
    outline: none;
    text-decoration: none;
    font-size: 4vh;
    cursor: pointer;
}

.btn-start:hover {
    color: #fff;
}

.blinking {
    animation: blinkingText 1.2s infinite;
}

@keyframes blinkingText{
    /*
    0%{     color: #000;    }
    49%{    color: #000; }
    60%{    color: transparent; }
    99%{    color: transparent;  }
    100%{   color: #000;    }*/
    0%, 40% { 
        opacity: 0; 
    } 
    50%, 99% { 
        opacity: 1; 
    }

}
</style>