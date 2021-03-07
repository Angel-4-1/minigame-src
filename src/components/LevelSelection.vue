<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

<transition name="fade">
  <PopUp 
    v-if="isOpen"
    :phraseID="phraseID"
    @closePopUp="closePopUp"/>
</transition>

<div class="selection-container">
<div v-bind:class="[isOpen ? blurClass : '']">
  <div class="selection-div">

    <!-- Listado de niveles + botones en forma de circulo -->
    <div class="container">

      <!-- Mostrar los niveles en forma de tarjeta -->
      <div class="slideshow-container">
        <div v-for="(level, index) in levels" :key="index">

          <!-- Si el nivel esta activo -->
          <div v-if="level.isActive" class="level-container">
            <!-- Siguiente nivel a la derecha -->
            <div v-if="index >= 0 && (index+1) < levels.length" class="card card-right">
              <img class="card-image" :src="require(`@/${levels[index+1].icon}`)" >
              <div class="card-content">
                <!-- <h1 class="numbertext numbertext-right">{{ levels[index+1].id + 1 }} / {{ levels.length }}</h1> -->
                <h1 class="card-header">{{ levels[index+1].name[language_id] }}</h1>
                <p class="card-text card-text-no-overflow">{{ levels[index+1].description[language_id] }}</p>
              </div>
            </div>
            

            <!-- Nivel anterior a la izquierda -->
            <div v-if="index < levels.length && (index-1) >= 0" class="card card-left">
              <img class="card-image" :src="require(`@/${levels[index-1].icon}`)" > <!--style="width:100%"-->
              <div class="card-content">
                <!-- <h1 class="card-header">{{ levels[index-1].id + 1 }} / {{ levels.length }}</h1> -->
                <h1 class="card-header">{{ levels[index-1].name[language_id] }}</h1>
                <p class="card-text card-text-no-overflow">{{ levels[index-1].description[language_id] }}</p>
              </div>
            </div>
            

            <!-- Nivel actual en el centro -->
            <div class="card">
              <img class="card-image" :src="require(`@/${level.icon}`)" alt="Level image">
              <div class="card-content">
                <!-- <h1 class="ca">{{ level.id + 1 }} / {{ levels.length }}</div> -->
                <h1 class="card-header">{{ level.name[language_id] }}</h1>
                <p class="card-text">{{ level.description[language_id] }}</p>
              </div>
              <button class="card-btn" @click="levelIsSelected(current_level)"> {{ btn_text }} </button>
            </div>
            
            
            <!-- Botones para ir al nivel anterior o al siguiente -->
            <a v-if="index > 0" class="btn-prev" @click="showNextLevel(-1, index)">&#10094;</a>
            <a v-if="index < (levels.length - 1)" class="btn-next" @click="showNextLevel(1, index)">&#10095;</a>
          </div>

        </div>  
      </div>

      <!-- Botones en forma de circulo -->
      <div class="dots">
        <span v-for="(level, index) in levels" :key="index" style="text-align:center">
          <!-- Circulo del nivel activo sera distinto al resto -->
          <span v-if="level.isActive">
            <span class="dot dot-active" @click="showLevel(index)"></span>
          </span>
          <span v-else>
            <span class="dot" @click="showLevel(index)"></span>
          </span>
        </span>
      </div>
    </div>

  </div>
</div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES as stages_constants, LEVELS, INSTRUCTOR } from '@/consts.js';
import PopUp from '@/components/PopUp.vue';

export default {
    name: 'LevelSelection',
    components: {
      PopUp
    },
    emits: ['levelIsSelected'], //lo que esta emitiendo a otros componentes
    data() {
      return {
        isOpen: false,
        levelID: '',
        slideIndex: 0,
        current_level: 0,
        levels: LEVELS,
        bkClass: 'bk',
        blurClass: 'blur',
        phraseID: 0,
        language_id: 0,
        btn_text: "SELECT"
      }
    },
    computed: {
        ...mapState( ['stage' , 'language'] )
    },
    methods: {
      toggleModal() {
        this.isOpen = !this.isOpen;
      },
      setLevelID(id) {
        this.levelID = id;
      },
      levelIsSelected(id) {
        this.$emit('levelIsSelected', id);
      },
      showNextLevel(n, index) {
        //comprobar que estemos dentro del rango de niveles
        let target = this.current_level + n;
        if ( target >= 0 && target < this.levels.length ) {
          this.current_level = target;
          //desactivar actual
          this.levels[index].isActive = false;
          //activar nuevo nivel
          this.levels[this.current_level].isActive = true;
        }            
      },
      showLevel(index) {
        this.current_level = index;
        for ( let i = 0; i < this.levels.length; i++ ) {
          this.levels[i].isActive = false;
        }
        this.levels[this.current_level].isActive = true;
      },
      closePopUp() {
        this.toggleModal();
      }
    },
    mounted() {
      this.language_id = this.language.id;
      this.isOpen = true;
      switch( this.language_id ) {
          case 1:
              this.btn_text = "SELECCIONAR";
              break;
          default: 
              this.btn_text = "SELECT";
              break;
      }
    },
    created() {
      this.current_level = 0;
    }
}
</script>

<style scoped>
* {
  font-family: 'Press Start 2P', 'Carter One', arial;
  font-size: 1rem;
  font-weight: normal;
}

.blur {
  filter: grayscale(100) blur(2px);
  /*Desactivar botones y cualquier interaccion posible*/
  pointer-events: none;
}

.selection-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide
{
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background: cyan;
}

.selection-div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: radial-gradient(#21dd6f, #157986);
}

h1 {
  color: #000000; 
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  resize: both;
  margin: 0; padding: 0;
}

.slideshow-container {
  width: 100%;
  position: absolute;
  margin: auto;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/*Contenedor de los niveles*/
.level-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
  height: auto;
  padding: 0;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 1%);
  /*background-color: #ffffff;*/
  border-radius: 5px;
}

/*Tarjeta del nivel principal*/
.card {
  background: rgb(211, 209, 209);
  padding: 5px;
  position: relative;
  display: inline-block;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 70vw;
  max-width: 400px;
  /*max-height: 30rem !important;*/
  border-radius: 10px;
  border: 2px solid rgb(255, 255, 255);
  flex-direction: column;
}

.card:after {
  padding-top: 56.25%;
  /* 16:9 ratio */
  display: block;
  content: '';
}

.card-image {
  display: block;
  width: 100%;
  height: 40vh;
  object-fit: cover;
  border-radius: 0.5rem;
}

.card-content {
  padding: 1px;
  height: 30vh;
}

.card-header {
  font-size:calc(11px + 0.8vw);
  font-weight: 500;
  color: #000;
  max-height: 5vh;
}

.card-text {
  font-size:calc(10px + .4vw);
  letter-spacing: 0.1rem;
  line-height: 1.7;
  color: #3d3d3d;
  height: calc(30px + 13vh);
  overflow-y: auto;
}

.card-btn {
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size:calc(11px + 1vw);
  text-align: center;
  color: #3363ff;
  background-color: #d8e0fd;
  border: none;
  outline: none;
  text-decoration: none;
  transition: 0.2s;
  border-radius: 0.4rem;
  cursor: pointer;
  letter-spacing: 0.1rem;
  height: 10vh;
  margin: 0;
}

.card-btn span {
  margin-left: 1rem;
  transition: 0.2s;
}

.card-btn:hover, .card-btn:active {
  background-color: #9baceb;
}

.card-btn:hover span, .card-btn:active span {
  margin-left: 1.5rem;
}

/*Botones para cambiar de nivel*/
.btn-prev, .btn-next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: auto;
  padding: 20px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 10px;
  user-select: none;
  background-color: rgba(209, 198, 198, 0.8);
}

/*Colocar cada boton a un extremo del contenedor al que pertenecen*/
.btn-next {
  right: 0;
}

.btn-prev {
  left: 0;
}

/*Efectos hover sobre los botones*/
.btn-prev:hover, .btn-next:hover {
  background-color: rgba(0,0,0,0.8);
}

/**Nivel a la derecha**/
.card-right {
  position: absolute;
  left: 65%;
  top: 50%;
  zoom: 0.85;
  transform: translate(-50%,-50%);
  background: rgb(197, 197, 197);
  filter: blur(3px);
  padding: 5px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 2px solid rgb(255, 255, 255);
}

/*No overflow en las tarjetas secundarias*/
.card-text-no-overflow {
  overflow: hidden;
}

/**Nivel a la izquierda**/
.card-left {
  position: absolute;
  left: 35%;
  top: 50%;
  zoom: 0.85;
  transform: translate(-50%,-50%);
  background: rgb(197, 197, 197);
  filter: blur(3px);
  padding: 5px;
  display: inline-block;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 2px solid rgb(255, 255, 255);
}

/*Contenedor botones en formato circular*/
.dots {
  position: absolute;
  bottom: 6%;
}
/*Botones individuales*/
.dot {
  position: relative;
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 4px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.dot:hover {
  background-color: #ffffff;
}
/*Boton del nivel activo*/
.dot-active {
  background-color: #ffffff;
  height: 20px;
  width: 20px;
  margin: -2.5px 2px;
}

</style>