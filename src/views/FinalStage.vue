<!--FINAL STAGE-->

<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <div class="finalstage-container">

        <div class="board-menu">

            <div class="board-header">
                <span class="header-empty"></span>
                <span class="header-title">
                    <h1 v-if="showResults">{{ titles.TITLE_GAMEOVER[language_id] }}</h1>
                    <h1 v-else>{{ titles.TITLE_GAMEOVER_STANDINGS[language_id] }}</h1>
                </span>
                <button class="header-btn btn-pointer" :style="{ backgroundImage: 'url(' + require(`@/assets/podium.png`) + ')' }" @click="renderStandings"></button>
            </div>

            <div class="board-content" v-if="showResults">
                <div class="property time">
                    <span class="left"><h2>{{ titles.TITLE_GAMEOVER_TIME[language_id] }}: </h2></span>
                    <span class="right"><h2>{{ time }}</h2></span>
                </div> 

                <div class="property score">
                    <span class="left"><h2>{{ titles.TITLE_GAMEOVER_POINTS[language_id] }}: </h2></span>
                    <span class="right"><h2>{{ game_score }}</h2></span>
                </div>
                <div class="property bonus-score">
                    <span class="left"><h2>{{ titles.TITLE_GAMEOVER_BONUS[language_id] }}:</h2></span>
                    <span class="right"><h2>{{ bonus_score }}</h2></span>
                </div>

                <div class="property total-score">
                    <span class="left"><h2>{{ titles.TITLE_GAMEOVER_TOTAL[language_id] }}: </h2></span>
                    <span class="right"><h2>{{ total_score }}</h2></span>
                </div>           
            </div>
            <div class="board-standings" v-else>
                <div v-for="(stand, index) in standings" :key="index" v-bind:class="[standings_player_pos == index ? 'standing player' : 'standing']">
                    <span class="standing-points">
                        <h3>{{stand.points}}</h3>
                    </span>

                    <span class="standing-pos gold" v-if="stand.pos == 1">
                        <h3>{{stand.pos}}</h3>
                    </span>
                    <span class="standing-pos silver" v-else-if="stand.pos == 2">
                        <h3>{{stand.pos}}</h3>
                    </span>
                    <span class="standing-pos bronze" v-else-if="stand.pos == 3">
                        <h3>{{stand.pos}}</h3>
                    </span>
                    <span class="standing-pos" v-else>
                        <h3>{{stand.pos}}</h3>
                    </span>
                </div>
                
            </div>

            <!-- Botones parte inferior -->
            <div class="board-buttons">
                <button class="btn btn-pointer" @click="reset">{{ buttons.BUTTON_GAMEOVER_RESET[language_id] }}</button>
                <button class="btn btn-pointer" @click="goHome">{{ buttons.BUTTON_GAMEOVER_HOME[language_id] }}</button>
            </div>
            
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { STAGES as stages_constants, AUDIO_FILES, TITLES, BUTTONS } from '@/consts.js';

export default {
    name: 'FinalStage',
    props: [
        'score_obtained'
    ],
    emits: [ 'resetGame' ],
    data() {
        return {
            destination: stages_constants.PLAY_STAGE,
            id: stages_constants.FINAL_STAGE,
            game_score: 0,
            bonus_score: 0,
            total_score: 0,
            time: 0,
            character_id: 0,
            level_id: 0,
            language_id: 0,
            buttons: BUTTONS,
            titles: TITLES,
            BGaudio: null,
            audio_src: AUDIO_FILES.AUDIO_GAMEOVER,
            standings: null,
            showResults: true,
            standings_player_pos: -1
        }
    },
    computed: {
        ...mapState( ['stage' , 'language', 'local_standings'] )
    },
    methods: {
        changeState(mydestination) {
            this.$store.commit('changeState', { index: this.id, destination: mydestination });
        },
        reset() {
            var msg = { characterID: this.character_id, levelID: this.level_id };
            this.$emit('resetGame', JSON.stringify( msg ) );
            this.changeState(this.destination);
        },
        goHome() {
            var msg = { characterID: -1, levelID: -1 };
            this.$emit('resetGame', JSON.stringify( msg ) );
            this.changeState(this.destination);
        },
        playSound() {
            this.BGaudio.currentTime = 0;
            this.BGaudio.play(); 
        },
        renderStandings() {
            this.showResults = !this.showResults;
        },
        // Guardar en el local storage
        saveStandings() {
            this.local_standings[ this.level_id ].standings = this.standings;
            localStorage.setItem( 'local-standings', JSON.stringify( this.local_standings ) );
        },
        updateStandings() {
            var max_index = -1;
            for( var i = this.standings.length-1; i >= 0; i-- ) {
                if( this.total_score > this.standings[i].points ) {
                    max_index = i;
                }
            }

            if( max_index != -1 ) {
                this.standings.splice( max_index, 0, { pos: max_index, points: this.total_score } );

                for ( var i = 0; i < this.standings.length; i++ ) {
                    this.standings[i].pos = i + 1;
                }

                this.standings = this.standings.slice( 0, 5 );
            }

            this.standings_player_pos = max_index;
        }
    },
    mounted() {
        //this.$props['score_obtained'] = { score: integer, bonus: integer, character: integer, level: integer, time: integer }
        //console.log( this.$props['score_obtained'] );
        var data = JSON.parse( this.$props['score_obtained'] );
        this.game_score = data.score;
        this.bonus_score = data.bonus;
        this.time = data.time;
        this.character_id = data.character;
        this.level_id = data.level;
        this.total_score = this.game_score + this.bonus_score;

        this.language_id = this.language.id;

        /**Disable PopUp**/
        this.$store.commit('changeEnablePopUp');

        /**AUDIO**/
        this.BGaudio = new Audio( require(`@/${this.audio_src}`));
        this.BGaudio.volume = 0.2;
        this.BGaudio.play();
        this.BGaudio.addEventListener( 'ended', this.playSound );

        // Extraemos datos de los resultados anteriores (previamente guardados en la store)
        this.standings = this.local_standings[ this.level_id ].standings;
        
        this.updateStandings();
        this.showResults = true;
    },
    unmounted() {
        this.BGaudio.pause();
        this.BGaudio.currentTime = 0;
        this.BGaudio.removeEventListener( 'ended', this.playSound );
        this.saveStandings();
    }
}
</script>

<style scoped>
.finalstage-container {
    background: url('~@/assets/BG_gameover.png');
    background-size: cover;
    background-repeat: no-repeat;
    image-rendering: pixelated;
    font-family: 'Press Start 2P', arial;
    display: flex;
    justify-content: center;
    align-items: center;
    /*flex-direction: column;*/
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
}

h1 {
    font-size: 5vh;
}

h2 {
    font-size: min(4vh, 26px);
}

/*RECUADRO BLANCO*/
.board-menu {
    position: relative;
    width: 100%;
    height: 80vh;
    max-width: 600px;
    max-height: 650px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 5%;

    display: grid;
    grid-template-rows: 20% 60% 20%;
    grid-template-areas: 
        "header"
        "content"
        "buttons";

    padding: 5px;
    border: 3px solid black;
}

.board-header {
    grid-area: header;

    display: grid;
    grid-template-columns: 19% 60% 19%;
    grid-template-areas: 
        "h-empty h-title h-btn";
    grid-column-gap: 1%;
}

.header-empty {
    grid-area: h-empty;
}

.header-title {
    grid-area: h-title;    
}

.header-title h1 {
    font-size: min(5.5vw, 35px);
}

.header-btn {
    grid-area: h-btn;

    outline: none;
    border: none;
    border-radius: 20px;
    color: #000;
    background: rgb(255, 255, 255, 0);
    font-size: 2vh;
    font-family: 'Press Start 2P', sans-serif;
    letter-spacing: 1px;
    background-size: cover;
    background-position: center center;
}

.header-btn:hover {
    opacity: 0.6;
}


/*CONTENT*/
.board-content {
    grid-area: content;
    display: grid;
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-areas: 
        "time"
        "score"
        "bonus-score"
        "total-score";
    justify-items: center;
    overflow-y: auto;
}

.board-content .score{
    grid-area: score;
}

.board-content .bonus-score{
    grid-area: bonus-score;
}

.board-content .total-score{
    grid-area: total-score;
    border-top: 3px solid rgb(0, 0, 0);
}

.board-content .total-score  h2 {
    color: red;
    text-transform: uppercase;
}   

.board-content .time{
    grid-area: time;
}

.property{
    width: 80%;
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-areas: 
        "left right";
    justify-items: center;
}

.left {
    grid-area: left;
    width: 100%;
    text-align: left;
}

.right {
    grid-area: right;
    width: 100%;
    text-align: right;
}

/**STANDINGS**/
.board-standings {
    grid-area: content;
    display: grid;
    grid-template-rows: auto;
    grid-row-gap: 10px;
    overflow-y: auto;
}

.standing {
    display: grid;
    grid-template-columns: 24% 74%;
    grid-template-areas: "pos points";
    grid-column-gap: 2%;
    width: 70%;
    justify-self: center;
    /* border: 2px solid black; */
    border-radius: 7px;
    background: rgb(255, 254, 196);
}

.player {
    background: rgb(137, 214, 144);
}

.standing-pos {
    grid-area: pos;
}

.gold {
    background: rgb(230, 228, 131);
    border-radius: 7px;
    /* border: 5px solid black; */
    box-shadow: 0px 0px 4px 5px rgb(180, 147, 54) inset;
}

.silver {
    background: rgb(160, 154, 154);
    box-shadow: 0px 0px 4px 5px rgb(88, 88, 87) inset;
    border-radius: 7px;
}

.bronze {
    background: rgb(165, 120, 90);
    box-shadow: 0px 0px 4px 5px rgb(105, 75, 55) inset;
    border-radius: 7px;
}

.standing-points {
    grid-area: points;
    text-align: right;
    padding-right: 10%;
}

/*BOTONES*/
.board-buttons {
    grid-area: buttons;
    display: grid;
    grid-template-columns: auto auto;
    grid-row-gap: 10px;
    padding: 2%;
}

/*FORMATO BOTONES*/
.board-buttons .btn {
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

.board-buttons .btn:hover {
    background: rgb(62, 138, 102);
    color: white;
}

</style>