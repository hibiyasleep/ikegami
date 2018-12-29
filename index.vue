<template>
  <div :class="[
    'scheme-' + (color_scheme || 'kagerou-material')
  ]">
    <userlist />
    <navbar />
    <settings v-if="opened_window === 'settings'" />
    <changelog v-if="opened_window === 'changelog'" />
    <debug
      v-if="debug" />
  </div>
</template>

<script>

import { mapState } from 'vuex'

import userlist from './c/parts/userlist.vue'
import navbar from './c/parts/navbar.vue'
import debug from './c/parts/debug.vue'
import settings from './c/parts/settings.vue'
import changelog from './c/parts/changelog.vue'

export default {
  components: {
    userlist,
    navbar,
    debug,
    settings,
    changelog
  },
  data: () => ({
    settingsOpened: false
  }),
  computed: {
    ...mapState('settings', [ 'debug', 'color_scheme' ]),
    ...mapState('ui', [ 'opened_window' ])
  }
}

</script>

<style lang="sass">

@import styles/reset
@import styles/index
@import styles/classes
@import styles/window

</style>
