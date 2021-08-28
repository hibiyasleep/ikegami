import Vue from 'vue'
import VueI18n from 'vue-i18n'

import index from './index.vue'
import store from './store'

import install from './lib/util'

import detectLayer from './lib/layer'
import initateLayer from './store/_initateLayer'
import dummy from './dummy-encounter.json'

import createI18n from './lib/i18n'

install(Vue)
Vue.use(VueI18n)

const layer = window.layer = Vue.prototype.$layer = new (detectLayer())

const i18n = createI18n()

const vm = window.rootvm = new Vue({
  components: { index },
  el: '#vue-root',
  template: '<index />',
  store,
  watch: {
    ['$store.state.settings.ui_scale']() {
      this.$store.dispatch('settings/updateGlobalStyle')
    },
    ['$store.state.settings.locale'](val) {
      this.$root.$i18n.locale = val
    }
  },
  mounted() {
    this.$store.dispatch('settings/updateGlobalStyle')
    this.$store.commit('settings/migrate')
    
    this.$root.$i18n.locale = this.$store.state.settings.locale
    initateLayer(layer)
  },
  i18n
})


if(process.env.NODE_ENV === 'development') {
  window._dummy = () => layer.emit('data', dummy)
  window._dummy()
  // i18n hot reload
  if (module.hot) {
    module.hot.accept(['./lib/i18n'], () => {
      const messages = require('./lib/i18n').messages
      for (const [key, value] of Object.entries(messages)) {
        i18n.setLocaleMessage(key, value)
      }
    })
  }
}
