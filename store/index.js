import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import encounter from './encounter'
import settings from './settings'

export default new Vuex.Store({
  modules: {
    encounter,
    settings
  }
})
