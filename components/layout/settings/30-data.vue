<template>
  <div class="tab-content">
    <radio-button
      :label="$t('settings.data.showDecimals')"
      :selections="new Map([
        [ 1, '123.4' ],
        [ 0, '1234' ],
        [ '-4', '1.2k' ]
      ])"
      v-model="show_decimals" />
    <textlist
      :label="$t('settings.data.nameForMerging')"
      :values="username_configured_computed"
      @input="updateUsername" />
    <string
      :label="$t('settings.data.automaticallySet')"
      :value="`(${uid}) ${username}`"
      disabled />
    <blockquote>
      {{ $t('settings.data.automaticallySetTip1') }}
      <br />
      {{ $t('settings.data.automaticallySetTip2') }}
    </blockquote>
  </div>
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
      'show_decimals',
      'uid',
      'username'
    ]),
    username_configured_computed() {
      return [].concat(this.username_configured, [''])
    }
  }
}

</script>
