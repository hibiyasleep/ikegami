<template>
  <div
    id="root"
    :class="[
      'root',
      'theme-' + (theme || 'none'),
      'scheme-' + (color_scheme || 'kagerou-material'),
      'icon-' + (job_icons || 'default'),
      'order-by-' + (list_order || 'asc'),
      'align-' + (list_align || 'center'), {
        'hide-name': hide_name,
        'hide-job-icons': hide_job_icon,
        'hide-handle': hide_handle,
        'blur-name': blur_name,
        'main-ticker-will-not-yield': !yield_for_subtickers,
        'layout-mode': layout_mode,
        'single-value': !cell_display2,
        'singleline': cell_display2? force_singleline_allowed : true,
        'force-singleline-allowed': force_singleline_allowed
      }
    ]">
    <userlist v-if="!hidden" />
    <navbar v-if="!hidden"/>
    <settings v-if="opened_window === 'settings'" />
    <changelog v-if="opened_window === 'changelog'" />
    <layout-mode v-if="layout_mode" />
  </div>
</template>

<script>

import packageinfo from './package.json'

import { mapState, mapGetters } from 'vuex'

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
      'theme',
      'job_icons',
      'yield_for_subtickers',
      'hide_name',
      'hide_job_icon',
      'hide_handle',
      'blur_name',
      'list_order',
      'list_align',
      'cell_display2'
    ]),
    ...mapState('ui', [
      'opened_window',
      'layout_mode'
    ]),
    ...mapState('ui', {
      hidden: state => !state.hideTimeoutId,
    }),
    ...mapGetters('settings', [
      'force_singleline_allowed'
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
