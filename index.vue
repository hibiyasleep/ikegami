<template>
  <div
    id="root"
    :class="[
      'root',
      'scheme-' + (color_scheme || 'kagerou-material'),
      'icon-' + (job_icons || 'default'), {
        'hide-name': hide_name,
        'hide-job-icons': hide_job_icon,
        'hide-handle': hide_handle,
        'blur-name': blur_name,
        'main-ticker-will-not-yield': !yield_for_subtickers,
        'layout-mode': layout_mode,
        'single-value': !cell_display2
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
import settings from './components/layout/settings/index.vue'
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
      'job_icons',
      'yield_for_subtickers',
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
        this.$store.commit('settings/set', {
          k: 'last_launched_version',
          v: packageinfo.version
        })
        this.$store.commit('ui/open', 'changelog')
      }
    }
  }
}

</script>

<style lang="sass">

@import styles/reset
@import styles/index
@import styles/window
@import styles/layout_mode

@import styles/enum/gauge-colors
@import styles/enum/job-colors
@import styles/enum/class-icons-raster
@import styles/enum/class-icons-vector

</style>
