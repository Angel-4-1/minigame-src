<!-- CHARACTER LIST
Mostrar una lista con los distintos personajes disponibles
-->
<template>
    <h1 class="title">Choose a character</h1>

    <div class="list">
        <article v-for="(character, index) in characters" :key="index" @click="setCharacterID(character.id)">
            <!--
                <img :src="imageUrl + character.id + '.png'" width="96" height="96" alt="Image Not Found">
            -->
            <img class="image" :src="require(`@/${character.icon}`)" width="96" height="96" alt="Character Icon Not Found">
            <h3>{{ character.name }}</h3>
        </article>
    </div>
</template>

<script>
import { CHARACTERS } from '@/consts.js';

export default {
    name: 'CharacterList',
    props: [
        'imageUrl',
    ],
    emits: ['setCharacterID'],  //aquello que enviamos al componente padre
    data() {
        return {
            //copiamos los personajes
            characters: CHARACTERS
        }
    },
    methods: {
        //enviar ID (al componente padre) del personaje al que el usuario ha clicado
        setCharacterID(id) {
            this.$emit('setCharacterID', id);
        }
    }/*, 
    created: {
    }
    */
}
</script>

<style scoped>
.list {
    transform: translate(0, -10%);
    display: grid;  /*Los elementos se mostraran en formato grid*/
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));    /*Numero de columnas sera responsive*/
    grid-gap: 10px;
    width: 100%;
    max-width: 500px;
    overflow-y: auto;   /*Permitir desplizar abajo*/
}

.list article {
    height: 150px; 
    background-color: #efefef;
    text-align: center;
    text-transform: capitalize;     /*Hacer que cada palabra empiece en mayuscula*/
    box-shadow: 0 15px 30px rgba(0,0,0,.2),     /*Activar una sombra*/
                0 10px 10px rgba(0,0,0,.2);
    border-radius: 5px;
    cursor: pointer;    /*Mostrar el cursor al pasar por encima*/
    transition: 0.4s;   /*Ver el efecto del hover al cabo de 0.4s*/
}

.list article:hover {
    background-color: #a4f35b;
}

h3 {
    margin: 0;
}

.title {
  transform: translate(0, -70%);
}

h1 {
    color: #ffffff;
}

.image {
    border-radius: 50%;
    margin-top: 6%;
}

</style>