import Vue from 'vue'
import Vuex from 'vuex'

const _state = () => ({
  cell_display1: 'dps',
  cell_display2: 'critcounts',
  reduced: false,
  show_decimals: true,
  username: '',
  username_configured: [],
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
    },
    updateName(state, { index, name }) {
      if(name.trim() === '') {
        state.username_configured.splice(index, 1)
      } else {
        Vue.set(state.username_configured, index, name)
      }
    }
  },
  getters: {
    usernames(state) {
      if(username_configured.length) {
        return [state.username].concat(state.username_configured)
      } else {
        return [state.username]
      }
    }
  },
  actions: {
  },
  namespaced: true
}
