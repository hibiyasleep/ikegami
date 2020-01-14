<template>
  <div :class="[
    'root',
    'scheme-' + (color_scheme || 'kagerou-material'), {
      'hide-name': hide_name,
      'hide-job-icons': hide_job_icon,
      'hide-handle': hide_handle,
      'blur-name': blur_name,
      'layout-mode': layout_mode,
      'singleline': !cell_display2
    }
  ]">
    <userlist />
    <navbar />
    <settings v-if="opened_window === 'settings'" />
    <changelog v-if="opened_window === 'changelog'" />
    <layout-mode v-if="layout_mode" />
  </div>
</template>

<script>

import packageinfo from './package.json'

import { mapState } from 'vuex'

import userlist from './components/layout/userlist.vue'
import navbar from './components/layout/navbar.vue'
import layoutMode from './components/layout/layout-mode.vue'
import settings from './components/layout/settings.vue'
import changelog from './components/layout/changelog.vue'

export default {
  components: {
    userlist,
    navbar,
    layoutMode,
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
      'hide_handle',
      'blur_name',
      'cell_display2'
    ]),
    ...mapState('ui', [
      'opened_window',
      'layout_mode'
    ])
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
@import styles/layout_mode

</style>
