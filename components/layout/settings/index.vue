<template>
  <window :title="`Settings - ikegami ${version} '${releasename}'`">

    <layout />
    <appearance />
    <data-options />

    <about />

  </window>
</template>

<script>

import { mapMutations } from 'vuex'

import packageinfo from '@/package.json'

import window from '@/components/window.vue'
import layout from './10-layout.vue'
import appearance from './20-appearance.vue'
import dataOptions from './30-data.vue'
import about from './99-about.vue'

export default {
  components: {
    window,
    layout,
    appearance,
    dataOptions,
    about
  },
  data: () => ({
    version: packageinfo.version,
    releasename: packageinfo.releasename
  })
}

</script>
