import Vue from 'vue'
import { ALLOWED_NARROW_CELL_VALUES } from '../lib/const'

const _version = 1

const _state = () => ({
  version: _version,
  // layout
  cell_display1: 'dps',
  cell_display2: '',
  // show_critbar: true, // deprecated on version 1
  tickers_dps_crit: '',
  tickers_healer_pct: 'below',
  yield_for_subtickers: true,
  hide_name: false,
  hide_job_icon: false,
  hide_after: 10,
  force_inline_short_values: true,
  reduced: false,
  // appearance
  ui_scale: 100,
  theme: '', // TODO: reconsider
  color_scheme: 'kagerou-material',
  job_icons: 'default',
  blur_name: false,
  // appearance: layout
  list_order: 'asc',
  list_align: 'center',
  // data
  shorten_name: 0,
  show_decimals: 0,
  username: '',
  username_configured: [],
  uid: '',
  // internal (auto)
  hide_handle: false,
  // changelog
  never_show_changelog_again: false,
  last_launched_version: null,
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
    },
    migrate(state) {
      // const defaults = _state()

      if(state.version < 1 || state.version == null) {
        delete state.show_critbar
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
    },
    force_singleline_allowed(state) {
      return state.force_inline_short_values && ALLOWED_NARROW_CELL_VALUES.some(_ =>
        _ === state.cell_display1 || _ === state.cell_display2
      )
    }
  },
  actions: {
    updateGlobalStyle({ state }) {
      window.document.documentElement.style.fontSize = (state.ui_scale * 0.16) + 'px'
    }
  },
  namespaced: true
}
