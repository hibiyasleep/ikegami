import Vue from 'vue'
import Vuex from 'vuex'

const _state = () => ({
  cell_display1: 'dps',
  cell_display2: 'critcounts',
  reduced: true,
  my_name: '',
  my_uid: ''
})

export default {
  state: _state(),
  mutations: {
    set(state, { k, v }) {
      Vue.set(state, k, v)
    }
  },
  getters: {
  },
  actions: {
  },
  namespaced: true
}
