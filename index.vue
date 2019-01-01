<template>
  <div :class="[
    'scheme-' + (color_scheme || 'kagerou-material'), {
      'hide-name': hide_name,
      'hide-job-icons': hide_job_icon,
      'blur-name': blur_name
    }
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

import packageinfo from './package.json'

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
    ...mapState('settings', [
      'debug',
      'color_scheme',
      'hide_name',
      'hide_job_icon',
      'blur_name'
    ]),
    ...mapState('ui', [ 'opened_window' ])
  },
  mounted() {
    if(!this.$store.state.settings.never_show_changelog_again) {
      if(this.$store.state.settings.last_launched_version !== packageinfo.version) {
        this.$store.commit('settings/set', { k: 'last_launched_version', v: packageinfo.version })
        this.$store.commit('ui/open', 'changelog')
      }
    }
  }
}

</script>

<style lang="sass">

@import styles/reset
@import styles/index
@import styles/classes
@import styles/window

</style>
