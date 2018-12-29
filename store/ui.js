import Vue from 'vue'
import Vuex from 'vuex'

const _state = () => ({
  opened_window: null
})

export default {
  state: _state(),
  mutations: {
    open(state, window) {
      state.opened_window = window
    },
    close(state) {
      state.opened_window = null
    }
  },
  getters: {
  },
  actions: {
  },
  namespaced: true
}
