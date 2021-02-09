<!--FINAL STAGE-->

<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <div class="finalstage-container">

        <div class="board-menu">

            <div class="board-header">
                <h1>GAME OVER</h1>
            </div>

            <div class="board-content">
                <div class="property time">
                    <span class="left"><h2>Time: </h2></span>
                    <span class="right"><h2>{{ time }}</h2></span>
                </div> 

                <div class="property score">
                    <span class="left"><h2>Score: </h2></span>
                    <span class="right"><h2>{{ game_score }}</h2></span>
                </div>
                <div class="property bonus-score">
                    <span class="left"><h2>Bonus:</h2></span>
                    <span class="right"><h2>{{ bonus_score }}</h2></span>
                </div>

                <div class="property total-score">
                    <span class="left"><h2>Total Score: </h2></span>
                    <span class="right"><h2>{{ total_score }}</h2></span>
                </div>           
            </div>

            <!-- Botones parte inferior -->
            <div class="board-buttons">
                <button class="btn" @click="reset">RESET</button>
                <button class="btn" @click="goHome">HOME</button>
            </div>
            
        </div>

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';

export default {
    name: 'FinalStage',
    props: [
        'score_obtained'
    ],
    data() {
        return {
            destination: stages_constants.PLAY_STAGE,
            id: stages_constants.FINAL_STAGE,
            game_score: 0,
            bonus_score: 0,
            total_score: 0,
            time: 0
        }
    },
    computed: {
        ...mapState( ['stage'] )
    },
    methods: {
        changeState(mydestination) {
            this.$store.commit('changeState', { index: this.id, destination: mydestination });
        },
        reset() {

        },
        goHome() {
            this.changeState(this.destination);
        }
    },
    mounted() {
        //this.$props['score_obtained'] = { score: integer, character: integer, level: integer, time: integer }
        console.log( this.$props['score_obtained'] );
        var data = JSON.parse( this.$props['score_obtained'] );
        this.game_score = data.score;
        this.time = data.time;
        this.total_score = this.game_score + this.bonus_score;
    }
}
</script>

<style scoped>
.finalstage-container {
    background: #ab8ff8;
    font-family: 'Press Start 2P', arial;
    display: flex;
    justify-content: center;
    align-items: center;
    /*flex-direction: column;*/
    position: absolute;
    top: 0;
    left: 0;
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
    height: 70vh;
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
}

.left {
    float: left;
}

.right {
    float: right;
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
    cursor: pointer;

    background: rgb(113, 235, 178);
    cursor: pointer; 
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