<!--INTRO STAGE-->

<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
    <div class="introstage-div">
        <h1>Intro Stage</h1>
        <button class="play-button" @click="changeState(destination)">PLAY</button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';

export default {
    name: 'IntroStage',
    data() {
        return {
            destination: stages_constants.PLAY_STAGE,
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
.introstage-div{
    position: relative;
    align-content: center;
    padding: 10px;
    background: #f88f8f;
    height: 100vh;
    font-family: 'Carter One', arial;
}
.play-button {
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

.play-button:hover {
    background: rgb(106, 141, 236);
    color: white;
}
</style>