<template>
  <div>
    <userlist />
    <navbar
      @openSettings="settingsOpened = true" />
    <settings
      v-if="settingsOpened"
      @close="settingsOpened = false" />
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

export default {
  components: {
    userlist,
    navbar,
    debug,
    settings
  },
  data: () => ({
    settingsOpened: false
  }),
  computed: {
    ...mapState('encounter', [ 'combatants', 'maxdps' ]),
    ...mapState('settings', [ 'debug' ])
  }
}

</script>

<style lang="sass">

@import styles/reset
@import styles/index
@import styles/classes

</style>
