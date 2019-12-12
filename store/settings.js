import Vue from 'vue'

const _state = () => ({
  cell_display1: 'dps',
  cell_display2: 'critcounts_wo_direct',
  reduced: false,
  show_decimals: true,
  username: '',
  username_configured: [],
  uid: '',
  hide_handle: false,
  // layout
  ui_scale: 100,
  hide_name: false,
  hide_job_icon: false,
  blur_name: false,
  color_scheme: 'kagerou-material',
  show_critbar: true,
  shorten_name: 0,
  // changelog
  never_show_changelog_again: false,
  last_launched_version: null,
  // etc
  theme: ''
})

export default {
  state: _state(),
  mutations: {
    set(state, { k, v }) {
      Vue.set(state, k, v)
    },
    toggle(state, k) {
      if(typeof state[k] === 'boolean') {
        state[k] = !state[k]
      }
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
      if(state.username_configured.length) {
        return [state.username].concat(state.username_configured)
      } else {
        return [state.username]
      }
    }
  },
  actions: {
    updateGlobalStyle({ state }) {
      window.document.body.parentElement.style.fontSize = (state.ui_scale * 0.16) + 'px'
    }
  },
  namespaced: true
}
