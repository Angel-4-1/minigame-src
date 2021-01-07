<!-- CHARACTER DETAIL -->
<template>
    <div class="detail">
        <div class="detail-view" v-if="show">

            <div v-if="character" class="image">
                <img :src="require(`@/${character.icon}`)" width="96" height="96" alt="Image Not Found">
            </div>

            <!-- Informacion sobre cada personaje -->
            <div v-if="character" class="data">
                <h2>{{ character.name }}</h2>
                <div class="property">
                    <div class="left">Base Experiecne</div>
                    <div class="right">{{ character.data }}</div>
                </div>

                <div class="property">
                    <div class="left">Base Experiecne</div>
                    <div class="right">{{ character.data }}</div>
                </div>

                <div class="property">
                    <div class="left">Base Experiecne</div>
                    <div class="right">{{ character.data }}</div>
                </div>

                <h3>Types</h3>
                <div class="types">
                    <div class="type">{{ character.ability }}</div>
                    <div class="type">{{ character.ability }}</div>
                    <div class="type">{{ character.ability }}</div>
                </div>

            </div>

            <!-- Botones parte inferior -->
            <div class="buttons">
                <button class="btn btn-close" @click="closeDetail">X</button>
                <button class="btn btn-accept" @click="characterIsSelected">YES</button>
            </div>
            
        </div>

    </div>
</template>

<script>
import { CHARACTERS } from '@/consts.js';

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
            character: null
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
            this.$emit('characterIsSelected');
        }
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
    border-bottom: 1px solid #ccc;
}

/*CONTENEDOR PRINCIPAL*/
.detail {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /*flex-direction: column;*/
    position: fixed;
    top: 0;
    left: -10px;
    padding: 90px 10px 10px;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.7); /*Oscurecer el fondo*/
}

/*RECUADRO BLANCO*/
.detail .detail-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    max-width: 510px;
    padding: 50px 0 0;
    background-color: #ffffff;
    border-radius: 5px;
}

/*IMAGEN*/
.detail .detail-view .image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -60px;
    height: 120px;
    width: 120px;
    background-color: #333;
    border-radius: 50%;
    overflow: hidden;
}

/*DESCRIPCION DEL PERSONAJE*/
.detail .detail-view .data {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-bottom: 40px;
}

/*LINEA DEBAJO DE LA DESCRIPCION*/
.detail .detail-view .property {
    width: 90%;
    max-width: 400px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
}

/*TEXTO A LA IZQUIERDA*/
.detail .detail-view .property .left{
    float: left;
}

/*TEXTO A LA DERECHA*/
.detail .detail-view .property .right{
    float: right;
}

/*DISTRIBUCION HABILIDADES*/
.detail .detail-view .types {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 90%;
    max-width: 400px;
}

/*FORMATO HABILIDADES*/
.detail .detail-view .type {
    margin: 0 10px 10px 0;
    padding: 5px 10px;
    border-radius: 20px;
    color: #fff;
    font-size: 1rem;
    letter-spacing: 2px;
    text-transform: capitalize;
    word-wrap: none;
    word-break: keep-all; 
    background-color: #0A2E50;
}

/*BOTONES*/
.detail .buttons {
    /*2 columnas*/
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 100px;
}

/*FORMATO BOTONES*/
.detail .buttons .btn {
    outline: none;
    border: none;
    border-radius: 25%;
    color: #efefef;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 1.5rem;
    cursor: pointer;
}

/*BOTON PARA CERRAR*/
.detail .buttons .btn-close {
    background-color: #ff0000;
}

/*BOTON PARA ACEPTAR*/
.detail .buttons .btn-accept {
    background-color: #14c214;
}

</style>