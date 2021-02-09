<!--PLAY STAGE-->

<template>
    <div class="playstage-div">
        <!-- <button class="btn-next" @click="changeState(destination)">END</button> -->

        <!-- Si el nivel no ha sido seleccionado -->
        <LevelSelection v-if="levelIsNotSelected"
            @levelIsSelected="levelIsSelected"/>

        <!-- Si el personaje no ha sido seleccionado -->
        <CharacterSelection v-if="isThereACharacter()"
            @characterIsSelected="characterIsSelected"/>

        <!-- Una vez tenemos el nivel y el personaje, empezamos la partida -->
        <MainGame v-if="canStartTheGame()"
            :characterID="characterID"
            :levelID="levelID"
            @gameIsOver="gameIsOver"/> 

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';
import CharacterSelection from '@/components/CharacterSelection.vue'
import LevelSelection from '@/components/LevelSelection.vue'
import MainGame from '@/components/MainGame.vue'

export default {
    name: 'PlayStage',
    components: {
        CharacterSelection,
        LevelSelection,
        MainGame
    },
    data() {
        return {
            destination: stages_constants.FINAL_STAGE,
            id: stages_constants.PLAY_STAGE,
            characterIsNotSelected: true,
            levelIsNotSelected: true,
            levelID: 0,
            characterID: 0,
            score: 0
        }
    },
    computed: {
        ...mapState( ['stage'] )
    },
    methods: {
        changeState(mydestination) {
            this.$store.commit('changeState', { index: this.id, destination: mydestination });
        },
        characterIsSelected(id) {
            this.characterIsNotSelected = false;
            this.characterID = id;
        },
        levelIsSelected(id) {
            this.levelIsNotSelected = false;
            this.levelID = id;
        },
        isThereACharacter() {
            return ( this.characterIsNotSelected == true && this.levelIsNotSelected == false );
        },
        gameIsOver( data ) {
            this.$emit('gameIsOver', data );
        }, 
        canStartTheGame() {
            return ( this.characterIsNotSelected == false && this.levelIsNotSelected == false );
        }
    },
    //al acceder por primera vez
    created() {
        this.characterIsNotSelected = true;
        this.levelIsNotSelected = true;
    },
    mounted() {
        this.characterIsNotSelected = true;
        this.levelIsNotSelected = true;
    }
}
</script>

<style scoped>
.playstage-div {
    height: 100vh;
}

/*BOTON NEXT*/
.playstage-div .btn-next {
    position: absolute;
    top: 5%;
    left: 90%;
    transform: translate(-50%,-50%);
    background-color: #00ff00;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    border: none;
    text-decoration: none;
    color: #000000;
    padding: 10px;
    margin-top: 10px;
    font-size: 1.2rem;
    cursor: pointer;
}
</style>