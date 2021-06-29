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
import { STAGES as stages_constants, AUDIO_FILES } from '@/consts.js';
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
    props: [
        'prevCharacterID',
        'prevLevelID'
    ],
    data() {
        return {
            destination: stages_constants.FINAL_STAGE,
            id: stages_constants.PLAY_STAGE,
            characterIsNotSelected: true,
            levelIsNotSelected: true,
            levelID: 0,
            characterID: 0,
            score: 0,
            BGaudio: null,
            audio_src: AUDIO_FILES.AUDIO_CONFIG,
            inGame: false
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
            if ( this.characterIsNotSelected == false && this.levelIsNotSelected == false )
            {
                this.inGame = true;
            } else {
                this.inGame = false;
            }
            return this.inGame;
        },
        playSound() {
            this.BGaudio.currentTime = 0;
            this.BGaudio.play(); 
        },
    },
    //al acceder por primera vez
    created() {
        this.characterIsNotSelected = true;
        this.levelIsNotSelected = true;
    },
    mounted() {
        this.characterIsNotSelected = true;
        this.levelIsNotSelected = true;

        var prevC = this.$props['prevCharacterID'];
        var prevL = this.$props['prevLevelID'];

        if ( prevC != -1 && prevL != -1 ) {
            this.characterIsNotSelected = false;
            this.levelIsNotSelected = false;
            this.characterID = prevC;
            this.levelID = prevL;
        }

        /**AUDIO**/
        if (!this.inGame) {
            this.BGaudio = new Audio( require(`@/${this.audio_src}`));
            this.BGaudio.volume = 0.1;
            this.BGaudio.play();
            this.BGaudio.addEventListener( 'ended', this.playSound );
        }
    },
    unmounted() {
    //    this.BGaudio.pause();
    //    this.BGaudio.currentTime = 0;
    //    this.BGaudio.removeEventListener( 'ended', this.playSound );
    },
    watch: {
        inGame: function() {
            if( this.inGame ) {
                this.BGaudio.pause();
                this.BGaudio.currentTime = 0;
                this.BGaudio.removeEventListener( 'ended', this.playSound );
            }
        }
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