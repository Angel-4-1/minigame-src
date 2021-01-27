<!-- PAUSE MENU -->
<template>


    <div class="pause-container">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap" rel="stylesheet">

        <div class="pause-menu" v-if="show">

            <div class="pause-header">
                <h1>PAUSE</h1>
            </div>

            <!-- Botones parte inferior -->
            <div class="pause-buttons">
                <button class="btn" @click="closeMenu">RESUM</button>
                <button class="btn" @click="reset">RESET</button>
                <button class="btn btn-quit" @click="quit">EXIT</button>
                <!--
                    <button class="btn btn-close" @click="closeDetail"></button>
                -->
            </div>
            
        </div>

    </div>
</template>

<script>

export default {
    name: 'PauseMenu',
    emits: [                //aquello que emitimos al padre
        'closePauseMenu',
        'resetGame',
        'quitGame' 
    ],    
    props: [ 'isPaused' ],
    data() {
        return {
            show: this.$props['isPaused']
        }
    },
    methods: {
        closeMenu() { //salir del menu de pausa
            this.show = false;
            this.$emit('closePauseMenu');
        },
        reset() {
            this.show = false;
            this.$emit('resetGame');
        },
        quit() {
            this.closeMenu();
            this.$emit('quitGame');
        }
    },
    created() {
        this.show = true;
    }
}
</script>

<style scoped>
* {
    font-family: 'Carter One', 'arial';
}
h1 {
    text-transform: capitalize;
    font-size: 5vh;
}

/*CONTENEDOR PRINCIPAL*/
.pause-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /*flex-direction: column;*/
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /*background: rgba(0,0,0,.7); /*Oscurecer el fondo*/
}

/*RECUADRO BLANCO*/
.pause-menu {
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
}

.pause-header {
    grid-area: header;
}


/*BOTONES*/
.pause-buttons {
    grid-area: buttons;

    display: grid;
    grid-template-rows: auto auto auto;
    grid-row-gap: 10px;
    padding: 2%;
}

/*FORMATO BOTONES*/
.pause-buttons .btn {
    outline: none;
    border: none;
    border-radius: 20px;

    color: #000;
    cursor: pointer;

    
    background: rgb(113, 235, 178);
    cursor: pointer; 
    border: 3px solid rgb(255, 255, 255);
    font-size: 2vh;

    font-family: 'Yusei Magic', sans-serif;
    letter-spacing: 1px;
}

.pause-buttons .btn:hover {
    background: rgb(62, 138, 102);
    color: white;
}

/*BOTON PARA CERRAR*/
.pause-buttons .btn-quit {
    background: rgb(236, 131, 131);
}

.pause-buttons .btn-quit:hover {
    background: rgb(235, 34, 34);
    color: white;
}

</style>