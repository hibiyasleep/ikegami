const _state = () => ({
  opened_window: null,
  layout_mode: false
})

export default {
  state: _state(),
  mutations: {
    open(state, window) {
      state.opened_window = window
    },
    close(state) {
      state.opened_window = null
    },
    toggleLayoutMode(state, to) {
      if(to === undefined) {
        state.layout_mode = !state.layout_mode
      } else {
        state.layout_mode = !!to
      }
    }
  },
  getters: {
  },
  actions: {
  },
  namespaced: true
}
