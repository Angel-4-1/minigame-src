<!--INTRO STAGE-->

<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
    <div class="turorial-div">
        <h1>Tutorial Stage</h1>
        <button class="btn-skip" @click="changeState(destination)">SKIP</button>
        <button class="btn-next" @click="changeState(destination)">NEXT</button>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';

export default {
    name: 'TutorialStage',
    data() {
        return {
            destination: stages_constants.PLAY_STAGE,
            id: stages_constants.TUTORIAL_STAGE
        }
    },
    computed: {
        ...mapState( ['stage'] )
    },
    methods: {
        changeState(mydestination) {
            this.$store.commit('changeState', { index: this.id, destination: mydestination})
        }
    }
}
</script>

<style scoped>
.turorial-div {
    position: relative;
    align-content: center;
    padding: 10px;
    background: #f88ff8;
    height: 100vh;
    font-family: 'Carter One', arial;
}

/*BOTON SKIP*/
.btn-skip {
    position: absolute;
    top: 5%;
    left: 90%;
    transform: translate(-50%,-50%);
    background-color: #ff0000;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    text-decoration: none;
    color: #ffffff;
    padding: 10px;
    margin-top: 10px;
    font-size: 1.2rem;
    cursor: pointer;
}

/*BUTTON NEXT*/
.btn-next {
    position: absolute;
    /*queda colocado respecto a uno de los vertices*/
    left: 50%;
    /*colocarlo bien*/
    transform: translate(-50%, -50%);
    bottom: 20%;

    background-color: #00ffff;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    text-decoration: none;
    color: #000000;
    padding: 10px;
    margin-top: 10px;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>