<template>
<link rel="preconnect" href="https://fonts.gstatic.com">
<!-- <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet"> -->
<link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    
    <transition name="fade">
    <PopUp 
        v-if="isOpen"
        :phraseID="phraseID"
        @closePopUp="closePopUp"/>
    </transition>
    
    <div v-bind:class="[isOpen ? blurClass : '', bkClass]">
        <div class="selection-div">
            <CharacterList 
                :imageUrl="imageUrl" 
                @setCharacterID="setCharacterID"/>

            <transition name="fade">
                <CharacterDetail 
                    v-if="showDetail" 
                    :imageUrl="imageUrl" 
                    :characterID="characterID"
                    @closeDetail="closeDetail"
                    @characterIsSelected="characterIsSelected"/>
            </transition>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { STAGES as stages_constants } from '@/consts.js';
import CharacterList from '@/components/CharacterList.vue';
import CharacterDetail from '@/components/CharacterDetail.vue';
import PopUp from '@/components/PopUp.vue';

export default {
    name: 'CharacterSelection',
    components: {
        CharacterList,
        CharacterDetail,
        PopUp
    },
    emits: ['characterIsSelected'], //lo que esta emitiiendo a otros componentes
    data() {
        return {
            imageUrl: 'something',
            characterID: '',
            showDetail: false,
            bkClass: 'bk',
            blurClass: 'blur',
            isOpen: false,  //Para mostrar o no el pop up
            phraseID: 1     //Frase que ha de aparecer en el pop up
        }
    },
    computed: {
        ...mapState( ['stage'] )
    },
    methods: {
        setCharacterID(id) {
            this.characterID = id;
            this.showDetail = true;
        },
        closeDetail() {
            this.characterID = '';
            this.showDetail = false;
        },
        characterIsSelected() {
            this.$emit('characterIsSelected', this.characterID);
        },
        closePopUp() {
            this.isOpen = false;
        }
    },
    mounted() {
      this.isOpen = true;
    }
}
</script>

<style scoped>
.bk {
  transition: all 0.5s ease-out;
}

.blur {
  filter: grayscale(100) blur(2px);
  /*Desactivar botones y cualquier interaccion posible*/
  pointer-events: none;
}

.selection-div {
    padding: 10px;
    background-color: red;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /*width: calc(100% - 20px);*/
    /*min-height: calc(100vh - 20px);*/
    background: radial-gradient(#156F99, #0A2E50);
    font-family: 'Press Start 2P', 'Carter One', arial;
    font-weight: normal;
}

h1 {
    color: #efefef;
}

/* donde aplicamos la transicion 
 * en este caso el ease-out va bien para la opacidad pero a veces es mejor tener el ease-in para enter y el esea-out para leave */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

/* from = como estara el elemento en el primer frame
 * to   = como estara en el ultimo frame */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>