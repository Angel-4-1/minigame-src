import { createStore } from 'vuex'
import { STAGES as stages_constants } from '@/consts.js';

export default createStore({
  state: {
    //Definicion de los distintos estados del juego
    stage: [
      { name: 'Stage',         id: stages_constants.STAGE,          change: false, change_to: 0 },
      { name: 'IntroStage',    id: stages_constants.INTRO_STAGE,    change: false, change_to: 0 },
      { name: 'TutorialStage', id: stages_constants.TUTORIAL_STAGE, change: false, change_to: 0 },
      { name: 'PlayStage',     id: stages_constants.PLAY_STAGE,     change: false, change_to: 0 },
      { name: 'FinalStage',    id: stages_constants.FINAL_STAGE,    change: false, change_to: 0 }
    ],
    current_stage: { name: 'IntroStage', id: 1 }
  },
  mutations: {
    changeState( state, payload ) {
      //payload = { index, destination }
      state.stage[payload.index].change = true;
      state.stage[payload.index].change_to = payload.destination;
      state.current_stage.id = payload.destination;
      state.current_stage.name = state.stage[payload.destination].name;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
