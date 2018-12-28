import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import encounter from './encounter'
import settings from './settings'
import ui from './ui'

export default new Vuex.Store({
  modules: {
    encounter,
    settings,
    ui
  },
  plugins: [
    createPersistedState({
      key: 'ikegami-settings#beta',
      paths: [ 'settings' ]
    })
  ]
})
