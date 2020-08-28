<template>
  <window
    type="without-wrapper"
    :title="`Settings - ikegami ${version} '${releasename}'`">
    <tab-container
      @navigate="navigate"
      :current="current"
      :tabs="new Map([
        [ 'display', 'Display' ],
        [ 'appearance', 'Appearance' ],
        [ 'data', 'Data' ],
        [ 'about', 'About' ]
      ])">
      <template v-slot:display>
        <display />
      </template>
      <template v-slot:appearance>
        <appearance />
      </template>
      <template v-slot:data>
        <data-options />
      </template>
      <template v-slot:about>
        <about />
      </template>
    </tab-container>
  </window>
</template>

<script>

import { mapMutations } from 'vuex'

import packageinfo from '@/package.json'

import tabContainer from '@/components/settings/tab-container.vue'
import window from '@/components/window.vue'
import display from './10-display.vue'
import appearance from './20-appearance.vue'
import dataOptions from './30-data.vue'
import about from './99-about.vue'

export default {
  components: {
    tabContainer,
    window,
    display,
    appearance,
    dataOptions,
    about
  },
  data: () => ({
    version: packageinfo.version,
    releasename: packageinfo.releasename,
    current: 'layout'
  }),
  methods: {
    navigate(to) {
      this.current = to
    }
  }
}

</script>

<style lang="sass">

//

</style>
