<!-- CHARACTER DETAIL -->
<template>
    <div class="detail">

        <div>
            <transition name="flip">

                <div v-if="flipped == false" class="card">
                    <span @click="closeDetail" class="close-card btn-pointer">X</span>
                    <span @click="toggleCard()" class="toggle-card btn-pointer">I</span>
                    
                    <div class="detail-header">
                        <span class="header-title"><h2>{{ character.name }}</h2></span>
                    </div>

                    <div class="detail-content-front">
                        <span class="btn-left">
                            <button class="btn" @click="changeView(false)"><a class="btn-pointer">&#10094;</a></button>
                        </span>
                        <span class="sprite-image" :style="{ background: `url(${require(`@/${character.sprite}`)}) 256px ${num}px` }"></span>
                        <span class="btn-right">
                            <button class="btn" @click="changeView(true)"><a class="btn-pointer">&#10095;</a></button>
                        </span>
                    </div>

                    <div class="buttons">
                        <button class="btn btn-accept btn-pointer" @click="characterIsSelected"> {{ buttons.BUTTON_SELECT[language_id] }} </button>
                    </div>               
                </div>

                <div v-else class="card card-back">
                    <span @click="closeDetail" class="close-card btn-pointer">X</span>
                    <span @click="toggleCard(card)" class="toggle-card btn-pointer">I</span>

                    <div class="detail-content-back">
                        <div class="detail-properties">     
                            <span class="header"><h3>{{ titles.TITLE_CHARACTER_DESCRIPTION[language_id] }} </h3></span>
                            <span class="data"><p>{{ character.data[language_id] }}</p></span>
                        </div>
                        

                        <div class="detail-abilities">
                            <div class="header"><h3>{{ titles.TITLE_CHARACTER_ABILITY[language_id] }}</h3></div>
                            <div class="type"><span>{{ character.ability[language_id] }}</span></div>
                        </div>
                        
                    </div>

                </div>

            </transition>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { CHARACTERS, BUTTONS, TITLES } from '@/consts.js';

export default {
    name: 'CharacterDetail',
    props: [
        'imageUrl',
        'characterID'
    ],
    emits: [ 'closeDetail', 'characterIsSelected' ],    //aquello que emitimos al padre
    data() {
        return {
            show: false,
            character: null,
            flipped: false,
            num: 0,
            language_id: 0,
            buttons: BUTTONS,
            titles: TITLES
        }
    },
    methods: {
        pickCharacter(id) {
            this.show = true;
            this.character = CHARACTERS[id];
        },
        closeDetail() { //no mostrar el detalle del personaje
            this.show = false;
            this.$emit('closeDetail');
        },
        characterIsSelected() {
            this.show = false;
            this.$emit('characterIsSelected', this.character.id);
        },
        toggleCard() {
            this.flipped = !this.flipped;
        },
        changeView( isRight ) {
            var newid = this.character.id;
            if ( isRight ) {
                newid++;
            } else {
                newid--;
            }

            var max = CHARACTERS.length;

            if ( newid < 0 ) { 
                newid = max - 1;
            } else if ( newid > max - 1 ) {
                newid = 0;
            }
           
            this.pickCharacter(newid);
        }
    }, 
    computed: {
        ...mapState( ['language'] )
    },
    mounted() {
        this.flipped = false;
        this.language_id = this.language.id;
    },
    created() {
        this.pickCharacter(this.$props.characterID);
    }
}
</script>

<style scoped>
h2 {
    text-transform: capitalize;
}

h3 {
    width: 90%;
    max-width: 400;
}

/*CONTENEDOR PRINCIPAL*/
.detail {
    /*Centrar*/
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.7); /*Oscurecer el fondo*/
}

.detail-header {
    grid-area: header;
}

.header-img {
    grid-area: header-img;
}

.header-title {
    grid-area: header-title;
}

.detail-content-front {
    grid-area: detailcontent;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-areas: 
        "btn-left sprite-image btn-right";
}

.detail-content-front .btn-left {
    grid-area: btn-left;
    margin: auto;
    
}

.btn {
    border: none;
    outline: none;
    background: none;
}

.btn a {
    font-size: 4vh;
    font-weight: bold;
}

.btn a:hover {
    font-size: 4vh;
    font-weight: bold;
    /* cursor: pointer; */
    color:rgb(71, 69, 69);
    font-size: 5vh;
}

.detail-content-front .btn-right {
    grid-area: btn-right;
    margin: auto;
}

.detail-content-front .sprite-image {
    grid-area: sprite-image;
    margin: auto;
    height: 165px;
    width: 128px;
}

.detail-content-back {
    grid-area: detailcontent;
    display: grid;
    grid-template-rows: 70% 30%;
    grid-template-areas: 
        "properties"
        "abilities";
}

.detail-content-back .property {
    margin: 2%;
    text-align: justify;
    line-height: 1.5;
    
}

.detail-properties {
    grid-area: properties;
    display: grid;
    grid-template-rows: 23% 77%;
    grid-template-areas: 
        "header"
        "property-data";
    margin: 2%;
    text-align: justify;
    line-height: 1.5;
}

.detail-properties .header {
    grid-area: header;
}

.detail-properties .header h3 {
    border-bottom: 3px solid rgb(0, 0, 0);
}

.detail-properties .data {
    grid-area: property-data;
    overflow-y: auto;
}

.detail-properties .data p {
    margin: 0;
}

.detail-abilities {
    grid-area: abilities;
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-areas: 
        "header"
        "type";
    margin: 2%;
    text-align: justify;
}

.detail-abilities .header {
    grid-area: header;
}

.detail-abilities .header h3 {
    border-bottom: 3px solid rgb(0, 0, 0);
}

.detail-abilities .type {
    grid-area: type;
    padding-top: 2%;
    margin-top: 1%;
}

.detail-abilities .type span {
    background: rgb(135, 199, 236);
    padding: 2%; 
    border-radius: 20px;
    color: white;
}


/*BOTONES*/
.detail .buttons {
    grid-area: buttons;
    justify-items: center;
    padding: 2%;
    justify-content: center;
}

/*FORMATO BOTONES*/
.detail .buttons .btn {
    outline: none;
    border: none;
    border-radius: 10px;

    color: #000;
    /* cursor: pointer; */

    background: rgb(113, 235, 178);   
    font-size: 2vh;
    font-family: 'Press Start 2P', sans-serif;
    letter-spacing: 1px;
    width: 100%;
    height: 100%;
}


/*BOTON PARA ACEPTAR*/
.detail .buttons .btn-accept {
    border: 3px solid rgb(145, 226, 138);
}

.detail .buttons .btn-close:hover {
    opacity: 0.5;
    border: 3px solid rgb(255, 0, 0);
}

.detail .buttons .btn-accept:hover {
    opacity: 0.5;
    border: 3px solid rgb(0, 255, 0);
}

.card {
    background-color: #ffffff;
    height: 70vh;
    width: 95vw;
    position: relative;
    top: 0;
    left: 0;
    max-width: 600px;
    max-height: 600px;
    border-radius: 10px;
    display: grid;
    grid-template-rows: 20% 60% 20%;
    grid-template-areas: 
        "header"
        "detailcontent"
        "buttons";    
}

.card-back {
    grid-template-rows: 5% 95%;
    grid-template-areas: 
        "header"
        "detailcontent";    
}


.close-card {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px 15px;
    opacity: .6;
    transition: all 0.5s ease;
    color: red;
    font-size: 3vh;
    cursor: pointer;
}

.close-card:hover {
    opacity: 1;
    transform: rotate(360deg);
}

.toggle-card {
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px 15px;
    opacity: .6;
    transition: all 0.5s ease;
    color: rgb(0, 132, 255);
    font-size: 3vh;
    cursor: pointer;
}

.toggle-card:hover {
    opacity: 1;
    transform: rotate(-360deg);
}

/**FLIP TRANSITION**/
.flip-enter-active {
    transition: all 0.4s ease;
}

.flip-leave-active {
    display: none;
}

.flip-enter-from, .flip-leave-to {
    transform: rotateY(180deg);
    opacity: 0;
}
</style>