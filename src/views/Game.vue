<!--GAME-->

<template> <!--IMPORTANTE: Template y div van juntos-->
    <div class="game-div">
        <!--@s nos lleva directo a la carpeta src-->

        <div v-if="current_stage.id == my_stages.STAGE"><Stage/></div>
        <div v-if="current_stage.id == my_stages.INTRO_STAGE"><IntroStage/></div>
        <div v-if="current_stage.id == my_stages.LANGUAGE_STAGE"><LanguageStage/></div>
        <div v-if="current_stage.id == my_stages.PLAY_STAGE">
            <PlayStage ref="playStage"
                :prevCharacterID="prevCharacterID"
                :prevLevelID="prevLevelID"
                @gameIsOver="gameIsOver"/>
        </div>
        <div v-if="current_stage.id == my_stages.FINAL_STAGE">
            <FinalStage
                :score_obtained="score_obtained"
                @resetGame="resetGame"/>
        </div>

        <h1> ID: {{ current_stage.id }} Name: {{ current_stage.name }}</h1>
        <button @click="changeState( true )">Next Stage</button>
        <button @click="changeState( false )">Previous Stage</button>

    </div>
</template>

<script>
import Stage from './Stage'
import IntroStage from './IntroStage.vue'
import LanguageStage from './LanguageStage.vue'
import PlayStage from './PlayStage.vue'
import FinalStage from './FinalStage.vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';

export default {
    name: 'Game',
    components: {
        Stage,
        IntroStage,
        LanguageStage,
        PlayStage,
        FinalStage,
    },
    data() {
        return {
            change_state: false,
            my_stages: stages_constants, //copiar los STAGES en variable local
            score_obtained: null,
            prevCharacterID: -1,
            prevLevelID: -1
        }
    },
    computed: {
        ...mapState( ['stage', 'current_stage', 'local_standings'] )
    },
    methods: {
        changeState( isNext ) {
            // isNext == false --> previous stage | true --> next stage
            let target = 0;
            let isValid = false;
            if ( isNext ) {
                target = this.current_stage.id + 1;
                if ( target <= this.my_stages.FINAL_STAGE ) { isValid = true; }
            } else {
                target = this.current_stage.id - 1;
                if ( target >= this.my_stages.STAGE ) { isValid = true; }
            }
            if ( isValid ) { 
                this.$store.commit('changeState', { index: this.current_stage.id, destination: target});
            }
            
        },
        //obtain de ID given the Stage name
        //input: string name of the stage | output: ID int
        getID(stageString) {
            for ( let i = 0; i < this.stage.length; i++ ) {
                if ( this.stage[i].name == stageString ) {
                return this.stage[i].id;
                }
            }

            return -1;
        },
        getName(id){
            for ( let i = 0; i < this.stage.length; i++ ) {
                if ( this.stage[i].id == id ) {
                return this.stage[i].name;
                }
            }

            return 'NotFound';
        },
        gameIsOver( data ) {
            this.score_obtained = data;
            this.changeState(this.my_stages.FINAL_STAGE);
        },
        resetGame( msg ) {
            // console.log( msg );
            var data = JSON.parse( msg );
            this.prevCharacterID = data.characterID;
            this.prevLevelID = data.levelID;
        }
    }, 
    mounted() {
        var datosDB = JSON.parse(localStorage.getItem('local-standings'));
        if ( datosDB != null && datosDB.length != 0 ) {
            this.$store.commit('updateLocalStandings', datosDB );
        }
    }
}
</script>


<style>
* {
    cursor: url('~@/assets/cursors/cursor.png'), auto;	
}

.btn-pointer:hover {
    cursor: url('~@/assets/cursors/cursor-click.png'), pointer;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.game-div {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    /* background: radial-gradient(#91d0ee, #1f466b); */
}
</style>
