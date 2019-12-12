<template>
  <div class="c-settings-input c-settings-textlist">
    <span class="label">
      <slot>{{ label }}</slot>
    </span>
    <ul class="textlist-wrap">
      <li v-for="(value, index) in values">
        <string-base
          :label="label"
          :value="value"
          @input="v => input(index, v)"
          placeholder="Type to add" />
      </li>
    </ul>
  </div>
</template>

<script>

import stringBase from './_string_base.vue'

import { mapState } from 'vuex'

export default {
  components: {
    stringBase
  },
  props: {
    label: String,
    values: Array,
    disabled: Boolean
  },
  methods: {
    input(index, value) {
      this.$emit('input', { index, value })
    },
    append(event) {
      this.$emit('append', event.target.value)
    }
  },
  computed: {
    ...mapState('settings', [
      'username_configured'
    ])
  }
}

</script>

<style lang="sass">

.c-settings-textlist

  .label
    align-self: flex-start

  .textlist-wrap

    > li
      display: flex
      align-items: center

      width: 100%
      height: $settings-element-height

      .buttons
        height: 1.5rem
        margin-right: 0.25rem


</style>
