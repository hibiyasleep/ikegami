<template>
  <label class="c-settings-input c-settings-dropdown">
    <span class="label">
      <slot>{{ label }}</slot>
    </span>
    <slot name="contents">
      <dropdown-body
        v-bind="$props"
        @input="input" />
    </slot>
  </label>
</template>

<script>

import dropdownBody from './dropdown-body.vue'

export default {
  components: {
    dropdownBody
  },
  props: {
    // directly passed to dropdown-body
    label: { type: String },
    empty: { type: String },
    selections: { type: Object, required: true },
    value: { type: [ String, Number, Boolean ] }
  },
  methods: {
    input(opt) {
      this.$emit('input', opt)
    }
  }
}

</script>

<style lang="sass">

.c-settings-dropdown
  position: relative

  .input-text
    @include clickable

</style>
