import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  plugins: [createPersistedState()],
  state: {
    notes: []
  },
  getters: {
    getNoteById: state => id => {
      return state.notes.find(note => note.id == id);
    },
    lastNoteId: state => {
      if (state.notes.length) {
        return state.notes[state.notes.length - 1].id;
      }

      return -1;
    }
  },
  mutations: {
    SAVE_NOTE(state, note) {
      const index = state.notes.findIndex(sNote => sNote.id === note.id);
      if (index >= 0) {
        state.notes[index] = note;
      } else {
        state.notes.push(note);
      }
    },
    REMOVE_NOTE(state, noteId) {
      const index = state.notes.findIndex(sNote => sNote.id === noteId);

      state.notes.splice(index, 1);
    }
  }
});
