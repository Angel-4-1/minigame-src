import { createStore } from 'vuex'
import { STAGES as stages_constants } from '@/consts.js';
import { LANGUAGES as languages_constants } from '@/consts.js';

export default createStore({
  state: {
    //Definicion de los distintos estados del juego
    stage: [
      { name: 'Stage',         id: stages_constants.STAGE,          change: false, change_to: 0 },
      { name: 'IntroStage',    id: stages_constants.INTRO_STAGE,    change: false, change_to: 0 },
      { name: 'LanguageStage', id: stages_constants.LANGUAGE_STAGE, change: false, change_to: 0 },
      { name: 'PlayStage',     id: stages_constants.PLAY_STAGE,     change: false, change_to: 0 },
      { name: 'FinalStage',    id: stages_constants.FINAL_STAGE,    change: false, change_to: 0 }
    ],
    current_stage: { name: 'IntroStage', id: 1 },
    languages: languages_constants,
    language: { name: "English", id: 0 }
  },
  mutations: {
    changeState( state, payload ) {
      //payload = { index, destination }
      state.stage[payload.index].change = true;
      state.stage[payload.index].change_to = payload.destination;
      state.current_stage.id = payload.destination;
      state.current_stage.name = state.stage[payload.destination].name;
    },
    changeLanguage( state, lan_id ) {
      for ( var i = 0; i < state.languages.length; i++ ) {
        if ( state.languages[i].id == lan_id ) {
          state.language.id = lan_id;
          state.language.name = state.languages[i].name
          break;
        }
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  }
})
