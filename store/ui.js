const _state = () => ({
  hideTimeoutId: null,
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
    updateHideTimeoutId(state, id) {
      if(id == null) {
        state.hideTimeoutId = null
      } else {
        clearTimeout(state.hideTimeoutId)
        state.hideTimeoutId = id
      }
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
    show({ commit, rootState }) {
      const timeoutId = setTimeout(() => {
        commit('updateHideTimeoutId', null)
      }, rootState.settings.hide_after * 1000)
      commit('updateHideTimeoutId', timeoutId)
    }
  },
  namespaced: true
}
