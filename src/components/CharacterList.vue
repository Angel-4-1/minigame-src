<!-- CHARACTER LIST
Mostrar una lista con los distintos personajes disponibles
-->
<template>
<div class="mycontain">
    <div class="characters-container">
        <div class="title">
            <h1>{{ titles.TITLE_CHARACTER_LIST[language_id] }}</h1>
        </div>
        

        <div class="list">
            
            <article v-for="(character, index) in characters" :key="index" @click="setCharacterID(character.id)" class="myarticle btn-pointer">
                
                <img class="image btn-pointer" :src="require(`@/${character.icon}`)" width="96" height="96" alt="Character Icon Not Found">
                <h3>{{ character.name }}</h3>
            
            </article>
            
        </div>
    </div>
</div>
</template>

<script>
import { CHARACTERS, TITLES } from '@/consts.js';
import { mapState } from 'vuex';

export default {
    name: 'CharacterList',
    props: [
        'imageUrl',
    ],
    emits: ['setCharacterID'],  //aquello que enviamos al componente padre
    data() {
        return {
            //copiamos los personajes
            characters: CHARACTERS,
            language_id: 0,
            titles: TITLES
        }
    },
    computed: {
        ...mapState( ['language'] )
    },
    methods: {
        //enviar ID (al componente padre) del personaje al que el usuario ha clicado
        setCharacterID(id) {
            this.$emit('setCharacterID', id);
        }
    },
    mounted() {
        this.language_id = this.language.id;
    }
}
</script>

<style scoped>
.mycontain {
    /*Centrar*/
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
    width: 100%;
    height: 100vh;
}

.characters-container {
    display: grid;
    grid-auto-rows: 10% 88%;
    grid-template-areas: 
        "title"
        "list";
    height: 90%;
    grid-row-gap: 2%;
}


.list {
    grid-area: list;
    display: grid;  /*Los elementos se mostraran en formato grid*/
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));    /*Numero de columnas sera responsive*/
    grid-gap: 10px;
    width: 100%;
    max-width: 500px;
    overflow-y: auto;   /*Permitir desplizar abajo*/
}

.myarticle {
    height: 150px; 
    background-color: #efefef;
    text-align: center;
    text-transform: capitalize;     /*Hacer que cada palabra empiece en mayuscula*/
    /* box-shadow: 0 15px 30px rgba(0,0,0,.2),     /*Activar una sombra*/
                /* 0 10px 10px rgba(0,0,0,.2); */ 
    box-shadow: 5px 5px  rgba(0,0,0,.2);
    border-radius: 5px;
    cursor: pointer;    /*Mostrar el cursor al pasar por encima*/
    transition: 0.4s;   /*Ver el efecto del hover al cabo de 0.4s*/
    border: 2px solid black;
}

.myarticle:hover {
    background-color: #a4f35b;
}

h3 {
    margin: 0;
    font-size: calc(11px + 0.5vh);
    padding: 5px;
}

.title {
  /*transform: translate(0, -70%);*/
    grid-area: title;
}

h1 {
    color: #ffffff;
    font-size: calc(11px + 1.25vh);
}

.image {
    /*border-radius: 50%;*/
    margin-top: 6%;
}

</style>