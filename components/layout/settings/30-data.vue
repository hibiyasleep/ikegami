<template>
  <group name="Data">
    <dropdown
      label="Decimal format"
      :selections="{
        1: '12345.6',
        0: '12346',
        '-4': '12.3k'
      }"
      v-model="show_decimals" />
    <textlist
      label="Name for merging"
      :values="username_configured_computed"
      @input="updateUsername" />
    <string
      label="(Automatically set)"
      :value="`(${uid}) ${username}`"
      disabled />
    <blockquote>
      If multiple pet (including other's) detected as yours, it'll cause
      duplication of merging.
      <br />
      Name will be automatically detected on ACTWS or recent version of
      OverlayPlugin. If not, try move to another region.
    </blockquote>
  </group>
</template>

<script>

import mapStateDynamically from '@/lib/map-state-dynamically.js'

import * as components from './_components.js'

export default {
  components,
  methods: {
    updateUsername({ index, value }) {
      this.$store.commit('settings/updateName', { index, name: value })
    }
  },
  computed: {
    ...mapStateDynamically('settings', [
      'username_configured',
      'show_decimals'
    ]),
    username_configured_computed() {
      return [].concat(this.username_configured, [''])
    }
  }
}

</script>
