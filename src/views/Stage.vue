<!--STAGE-->

<template>
    <div class="stage-div">
        <h1>STAGE</h1>
        <button @click="changeState(1)">NEXT</button>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';

export default {
    name: 'Stage',
    data() {
        return {
            id: stages_constants.STAGE
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
.stage-div {
    /*
    position: relative;
    top: 0;
    left: 0;
    border: 4px solid red;*/
    padding: 10px;
    background-color: #8ff8a9;
    height: 75vh;
}
</style>