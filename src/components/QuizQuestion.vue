<!-- PAUSE MENU -->
<template>
    <div class="quiz-container">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <div class="quiz-menu" v-if="show">

            <div id="timer">

                <svg class="timer-back">
                    <g>
                    <circle r="40" cx="50%" cy="50%" id="track"></circle>
                    <circle r="40" cx="50%" cy="50%" id="progress"></circle>
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" id="timer-time">{{timer.current_time}}</text>
                    </g>
                </svg>

            </div>

            <div class="quiz-header">
                <h1>{{ questions[question_id].question[language_id] }}</h1>
            </div>

            <!-- Botones parte inferior -->
            <div class="quiz-buttons">
                <button v-for="(answer, index) in questions[question_id].answers" :key="index" :class="[selected == index ? 'discard-btn btn-pointer' : 'btn btn-pointer' ]" @click="selectAnswer( answer.status )">
                    {{ answer.name[language_id] }}
                </button>
            </div>

        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { QUIZ_QUESTIONS, AUDIO_FILES } from '@/consts.js';
import '../game/confetti.js';
import { launchConfetti } from '../game/confetti.js';

export default {
    name: 'QuizQuestion',
    emits: [
        'closeQuiz'
    ],
    props: [ 'isQuiz', 'quizAbility' ],
    data() {
        return {
            show: this.$props['isQuiz'],
            questions: QUIZ_QUESTIONS,
            question_id: 0,
            questions_array: [],
            ability: false,
            selected: -1,
            language_id: 0,
            audio_good: null,
            audio_bad: null,
            audio_countdown: null,
            audio_src_good: AUDIO_FILES.AUDIO_QUIZ_GOOD,
            audio_src_bad: AUDIO_FILES.AUDIO_QUIZ_BAD,
            audio_src_countdown: AUDIO_FILES.AUDIO_QUIZ_COUNTDOWN,
            timer: {
                progressCircle: '',
                radius: 0,
                circumference: 0,
                current_time: 20,
                max_time: 20,
                range: [ 0, 10 ]
            },
            intervalID: null
        }
    },
    computed: {
        ...mapState( ['stage' , 'language'] )
    },
    methods: {
        // Select an answer + return to the main game
        selectAnswer( status ) {
            this.show = false;

            if ( status ) {
                this.audio_good.play();
                launchConfetti();
            } else {
                this.audio_bad.play();
            }

            // return to the game
            var points = status ? 1 : 0;
            var msg = { bonus: points };
            this.$emit( 'closeQuiz', JSON.stringify( msg ) );
        },
        randomIntFromInterval(min, max) { // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        chooseRandomQuestion() {
            this.question_id = this.randomIntFromInterval( 0, this.questions.length - 1 );
        },
        // Shuffle an array
        shuffle(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        },
        randomlySelectFalseAnswer() {
            var size = this.questions[this.question_id].answers.length;
            this.selected = this.randomIntFromInterval(0 , size - 1 );
            while( this.questions[this.question_id].answers[ this.selected ].status == true ) {
                this.selected = this.randomIntFromInterval(0 , size - 1 );
            }
        },
        // Read the svg circle from the document + store locally its values
        initTimer() {
            this.timer.progressCircle = document.querySelector("#progress");
            this.timer.radius = this.timer.progressCircle.r.baseVal.value;
            this.timer.circumference = this.timer.radius * 2 * Math.PI;
            this.timer.progressCircle.style.strokeDasharray = this.timer.circumference;
        },
        setPercentage( percent ) {
            var circle = this.timer;
            //0 - 100
            circle.progressCircle.style.strokeDashoffset = circle.circumference - (percent / 100) * circle.circumference;

            if (percent <= 30) {
                circle.progressCircle.style.stroke = "lightcoral";
            }
        },
        // Obtain the length of the svg circle ( for the dasharray property )
        getLengthCircumference() {
            var logo = document.querySelectorAll("#progress");
            for ( let i = 0; i < logo.length; i++ ) {
                console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
            }
        },
        updateTimer(that) {
            that.timer.current_time--;
            this.audio_countdown.play();
            if ( that.timer.current_time <= 0 ) {
                //stop
                that.timer.current_time = 0;
                clearInterval( that.intervalID );
                that.selectAnswer( false );
                that.timer.progressCircle.style.stroke = "rgb(141, 240, 128)";
            }
            // Calculate percentage
            var p = ( that.timer.range[1] / that.timer.max_time ) * that.timer.current_time - that.timer.range[0];
            p = p * 10;
            that.setPercentage( p );
        }
    },
    mounted() {
        this.language_id = this.language.id;

        // Check if the character has the ability to help on the quiz
        this.ability = this.$props['quizAbility'];
        if( this.ability == 1 ) {
            this.randomlySelectFalseAnswer();
        } else if ( this.ability == 2 ) {
            this.timer.current_time += 10;
            this.timer.max_time += 10;
        }

        // Prepare audios
        this.audio_good = new Audio( require(`@/${this.audio_src_good}`));
        this.audio_good.volume = 0.1;
        this.audio_bad = new Audio( require(`@/${this.audio_src_bad}`));
        this.audio_bad.volume = 0.1;
        this.audio_countdown = new Audio( require(`@/${this.audio_src_countdown}`));
        this.audio_countdown.volume = 0.25;

        // Initialize timer + start interval
        this.initTimer();
        var that = this;
        this.intervalID = setInterval( function() {
                that.updateTimer(that);
            }, 1000 );
    },
    unmounted() {
        clearInterval( this.intervalID );
    },
    created() {
        this.show = true;
        this.chooseRandomQuestion();
        this.shuffle( this.questions[this.question_id].answers );
    }
}
</script>

<style scoped>
* {
    font-family: 'Press Start 2P', 'Carter One', 'arial';
}
h1 {
    text-transform: capitalize;
    font-size: 3vh;
}

/*CONTENEDOR PRINCIPAL*/
.quiz-container {
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

/*RECUADRO BLANCO*/
.quiz-menu {
    position: relative;
    width: 100%;
    height: 70vh;
    max-width: 600px;
    max-height: 650px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 5%;

    display: grid;
    grid-template-rows: 20% 80%;
    grid-template-areas:
        "header"
        "buttons";

    padding: 5px;
    border: 3px solid black;
}

.quiz-header {
    grid-area: header;
    z-index: 10;
}

.quiz-header h1 {
    font-size: min( 3vw, 22px);
}

/*BOTONES*/
.quiz-buttons {
    grid-area: buttons;

    display: grid;
    grid-template-rows: auto auto auto;
    grid-row-gap: 10px;
    padding: 2%;
}

/*FORMATO BOTONES*/
.quiz-buttons .btn {
    outline: none;
    border: none;
    border-radius: 20px;

    color: #000;
    background: rgb(113, 235, 178);
    border: 3px solid rgb(255, 255, 255);
    font-size: 2.5vh;

    font-family: 'Press Start 2P', sans-serif;
    letter-spacing: 1px;
}

.quiz-buttons .btn:hover {
    background: rgb(62, 138, 102);
    color: white;
}

.discard-btn {
    outline: none;
    border: none;
    border-radius: 20px;

    color: #000;
    background: rgb(143, 146, 144);
    border: 3px solid rgb(255, 255, 255);
    font-size: 2.5vh;

    font-family: 'Press Start 2P', sans-serif;
    letter-spacing: 1px;
}

.quiz-buttons .discard-btn:hover {
    background: rgb(110, 112, 110);
    color: white;
}

#timer {
    background: white;
    position: absolute;
    top: -6%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    /* animation: fill-anim 5s ease forwards 4s; */
    /*stroke-dashoffset: 495.22;
    animation: line-anim 5s ease forwards; */
}

.timer-back {
    width: 100px;
    height: 100px;
    /* min-width: 100px;
    min-height: 100px; */
}

#timer-time {
    font-size: 3vh;
}

#track {
    stroke: rgba(182, 216, 191, 0.39);
    stroke-width: 10;
    fill: none;
    min-width: 100px;
    min-height: 100px;
}

#progress {
    stroke: rgb(141, 240, 128);
    fill: none;
    stroke-width: 10;
    stroke-dasharray: 250.92;
    stroke-dashoffset: 0;
    transform: rotate(-90deg);
    transform-origin: center;
    transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
    transition-duration: 0.3s;
}
</style>