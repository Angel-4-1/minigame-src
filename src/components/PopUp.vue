<!-- POP UP MESSAGE FROM THE INSTRUCTOR -->
<template>
    <div class="modal">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

        <div class="modal-image">
            <img class="avatar" :src="require(`@/${instructor.icon}`)" alt="Image Not Found">
        </div>
        
        <div class="modal-content">

            <div class="modal-title">
                <h1>{{ phrases.title }}</h1>
            </div>

            <div class="modal-text">
                <p>{{ phrases.content }}</p>
            </div>

            <div class="modal-footer">
                <button class="btn-modal-blink" @click="closePopUp">Close</button>
            </div>

        </div>
    </div>
</template>

<script>
import { INSTRUCTOR } from '@/consts.js';

export default {
    name: 'PopUp',
    props: [
        'phraseID'
    ],
    emits: [ 'closePopUp' ],    //aquello que emitimos al padre
    data() {
        return {
            instructor: INSTRUCTOR[0],
            phrases: INSTRUCTOR[0].phrases[this.$props.phraseID]
        }
    },
    methods: {
        closePopUp() {
            this.$emit('closePopUp');
        }
    }
}
</script>

<style scoped>
* {
    font-family: 'Press Start 2P', 'Carter One', 'arial';
}

.modal {
    position: absolute;
    height: 40%;
    width: 80%;
    background: white;
    border-radius: 10px;
    left: 50%;
    top: 30%;
    z-index: 1;
    transform: translate(-50%, -50%);

    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-areas: "modal-image modal-content";

    padding: 5px;
    max-width: 700px;
    word-wrap: break-word;
    border: 3px solid black;
}

/**PARTE DE LA IMAGEN**/
.modal-image {
    grid-area: modal-image;
    padding: 10px;
    margin: 0;
    max-height: 100%;
    max-width: 100%;
}

/**IMAGEN A MOSTRAR**/
.avatar {
    max-height: 100%;
    max-width: 100%;
    background: black;
    border: 4px solid red;
    margin: 0;
}

/**PARTE DEL CONTENIDO**/
.modal-content {
    grid-area: modal-content;

    display: grid;
    grid-template-rows: 20% 60% 20%;
    grid-template-areas: 
        "content-header"
        "content-body"
        "content-footer";
    padding: 5px;
}

/**PARTE SUPERIOR DEL CONTENIDO**/
.modal-title {
    grid-area: content-header;
    text-align: left;
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
    vertical-align: middle;
    padding: 5px;
}

.modal-title h1 {
    font-size:calc(12px + 1.5vw);
    margin: 0;
}

/**PARTE CENTRAL DEL CONTENIDO**/
.modal-text {
    grid-area: content-body;
    overflow: hidden;
    padding: 5px;
    text-align: left;
}

.modal-text p {
    font-size:calc(5px + 1.5vw);
    color: #000000; 
    word-wrap: break-word;
    margin: 0;
}

/**FOOTER DEL CONTENIDO**/
.modal-footer {
    grid-area: content-footer;
    padding: 5px;
}

/**BOTON PARA CERRAR**/
.btn-modal-close {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    font-size:calc(11px + 1vw);
    text-align: center;
    color: #3363ff;
    background-color: #d8e0fd;
    border: none;
    outline: none;
    text-decoration: none;
    transition: 0.2s;
    letter-spacing: 0.1rem;
    cursor: pointer;
}

.btn-modal-close:hover, .btn-modal-close:active {
  background-color: #9baceb;
}

/**BLINKING BUTTON**/
.btn-modal-blink {
    background: none;
    border: none;
    outline: none;
    text-decoration: none;
    font-size: 4vh;
    cursor: pointer;

    width: 100%;
    height: 100%;
    font-size:calc(11px + 1vw);
    text-align: center;
    color: #000;

    letter-spacing: 0.1rem;
    animation: blinkingText 1.2s infinite;
}

.btn-modal-blink:hover {
    color: rgb(255, 0, 0);
}

@keyframes blinkingText{
    0%, 40% { 
        opacity: 0; 
    } 
    50%, 99% { 
        opacity: 1; 
    }
}
</style>