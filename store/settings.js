import Vue from 'vue'
import Vuex from 'vuex'

const _state = () => ({
  cell_display1: 'dps',
  cell_display2: 'critcounts',
  reduced: false,
  username: '',
  uid: '',
  // layout
  hide_name: false,
  hide_job_icon: false
})

export default {
  state: _state(),
  mutations: {
    set(state, { k, v }) {
      Vue.set(state, k, v)
    },
    setName(state, [ uid, username ]) {
      state.uid = uid
      state.username = username
    }
  },
  getters: {
  },
  actions: {
  },
  namespaced: true
}
