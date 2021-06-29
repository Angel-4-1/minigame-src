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
                <h1>{{ title }}</h1>
            </div>

            <div id="modal-text">
                <!-- Actualiza el valor del innerHTML -->
                <p v-html="text"></p>
            </div>

            <div id="modal-survey" v-if="has_survey">
                <a class="btn-pointer" :href=survey target="_blank">{{survey_text}}</a>
            </div>

            <div class="modal-footer">
                <button class="btn-modal-blink btn-pointer" @click="closePopUp">{{ btn_text }}</button>
            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { INSTRUCTOR, AUDIO_FILES } from '@/consts.js';

export default {
    name: 'PopUp',
    props: [
        'phraseID'
    ],
    emits: [ 'closePopUp' ],    //aquello que emitimos al padre
    data() {
        return {
            instructor: INSTRUCTOR[0],
            phrases: INSTRUCTOR[0].phrases[this.$props.phraseID],
            survey: "",
            has_survey: false,
            survey_text: "",
            timer: null,
            text: '',
            stop: false,
            speed: 60,
            language_id: 0,
            phrase: "",
            title: "",
            btn_text: "Close",
            BGaudio: null,
            audio_src: AUDIO_FILES.AUDIO_WRITE,
            panel: null
        }
    },
    computed: {
        ...mapState( ['language'] )
    },
    methods: {
        closePopUp() {
            this.$emit('closePopUp');
        },
        printTypeWriter() {
            //Mientras tengamos algo para escribir
            if ( this.stop == false ) {
                //Limpiar lo que tengamos
                this.stopTypeWriter();
                var i = -1;
                this.timer = setInterval( () => {
                    i++;
                    const x = i % this.phrase.length;
                    this.text += this.phrase[x];
                    this.panel.scrollTop = this.panel.scrollHeight;
                }, this.speed );
                
                
            }
        },
        stopTypeWriter() {
            clearInterval( this.timer );
        },
        playSound() {
            this.BGaudio.currentTime = 0;
            this.BGaudio.play(); 
        }
    },
    mounted() {
        this.language_id = this.language.id;
        this.title = this.phrases.title[this.language_id]
        this.phrase = this.phrases.content[this.language_id];
        this.survey = this.phrases.survey;
        this.has_survey = this.phrases.has_survey;
        switch( this.language_id ) {
            case 1:
                this.btn_text = "Cerrar";
                this.survey_text = "Encuesta AQUI";
                break;
            default: 
                this.btn_text = "Close";
                this.survey_text = "Survey HERE";
                break;
        }
        
        /**AUDIO**/
        this.BGaudio = new Audio( require(`@/${this.audio_src}`));
        this.BGaudio.volume = 0.6;
        this.BGaudio.playbackRate = 0.9;
        this.BGaudio.play();
        this.BGaudio.addEventListener( 'ended', this.playSound );
        this.panel = document.getElementById("modal-text");
        this.printTypeWriter();
    },
    watch: {
        text: function() {
            //Parar cuando la variable text ya contenga todo el mensaje que queriamos mostrar
            if ( this.text.length == this.phrase.length ) {
                this.stop = true;
                this.stopTypeWriter();
                this.BGaudio.pause();
                this.BGaudio.currentTime = 0;
            }
        }
    }, 
    unmounted() {
        this.BGaudio.removeEventListener( 'ended', this.playSound );
    }
}
</script>

<style scoped>
* {
    font-family: 'Press Start 2P', 'Carter One', 'arial';
}

.modal {
    position: absolute;
    height: 55%;
    width: 80%;
    background: white;
    border-radius: 10px;
    left: 50%;
    top: 37%;
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
    /*background: black;
    border: 4px solid red;*/
    margin: 0;
}

/**PARTE DEL CONTENIDO**/
.modal-content {
    grid-area: modal-content;

    display: grid;
    grid-template-rows: 20% 50% 14% 14%;
    grid-template-areas: 
        "content-header"
        "content-body"
        "content-link"
        "content-footer";
    padding: 5px;
    height: 100%;
    max-height: 100%;
    overflow: hidden;
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
    font-size:calc(12px + 1.5vh);
    margin: 0;
}

/**PARTE CENTRAL DEL CONTENIDO**/
#modal-text {
    grid-area: content-body;
    padding: 5px;
    text-align: left;
    overflow-y: auto;
    max-height: 100%;
}

#modal-text p {
    font-size:calc(5px + 1.4vh);
    color: #000000; 
    word-wrap: break-word;
    margin: 0;
}

/**FOOTER DEL CONTENIDO**/
.modal-survey {
    grid-area: content-link;
    padding: 5px;
}

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