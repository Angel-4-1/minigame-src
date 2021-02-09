<!-- PAUSE MENU -->
<template>
    <div class="quiz-container">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <div class="quiz-menu" v-if="show">

            <div class="quiz-header">
                <h1>{{ questions[question_id].question }}</h1>
            </div>

            <!-- Botones parte inferior -->
            <div class="quiz-buttons">
                <button v-for="(answer, index) in questions[question_id].answers" :key="index" class="btn" @click="selectAnswer( answer.status )">
                    {{ answer.name }}
                </button>
            </div>
            
        </div>

    </div>
</template>

<script>
import { QUIZ_QUESTIONS } from '@/consts.js';

export default {
    name: 'QuizQuestion',
    emits: [                //aquello que emitimos al padre
        'closeQuiz'
    ],    
    props: [ 'isQuiz' ],
    data() {
        return {
            show: this.$props['isQuiz'],
            questions: QUIZ_QUESTIONS,
            question_id: 0,
            questions_array: []
        }
    },
    methods: {
        selectAnswer( status ) { //salir del menu de pausa
            this.show = false;
            //es la opcion correcta ?
            // ...
            console.log( status );
            //volver al juego
            this.$emit('closeQuiz');
        },
        randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        chooseRandomQuestion() {
            this.question_id = this.randomIntFromInterval( 0, this.questions.length - 1 );
        },
        //Mezclar el array
        shuffle(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
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
    cursor: pointer;
    
    background: rgb(113, 235, 178);
    cursor: pointer; 
    border: 3px solid rgb(255, 255, 255);
    font-size: 2.5vh;

    font-family: 'Press Start 2P', sans-serif;
    letter-spacing: 1px;
}

.quiz-buttons .btn:hover {
    background: rgb(62, 138, 102);
    color: white;
}

</style>