<template>
  <label class="c-settings-input c-settings-checkbox" @click="input">
    <span class="label">
      <slot>{{ label }}</slot>
    </span>
    <span :class="[ 'input', { checked: value } ]" />
  </label>
</template>

<script>

export default {
  props: {
    label: String,
    value: Boolean
  },
  methods: {
    input() {
      this.$emit('input', !this.value)
    }
  }
}

</script>

<style lang="sass">

.c-settings-checkbox
  .input
    @include clickable
    position: relative
    width: 1.5rem
    height: 1.5rem

    flex-shrink: 0

    &::after
      display: inline-block
      content: ''

      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      margin: auto

      width: 1.5rem
      height: 1.5rem

      opacity: 0.2

      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline stroke="#{_esc($ui-color)}" fill="none" stroke-width="2" points="4 12 9 17 20 6"/></svg>')
      background-position: center
      background-size: 1.5rem
      background-repeat: no-repeat

    &.checked::after
      opacity: 1

  &.small
    .input
      width: 1rem
      height: 1rem
      &::after
        width: 1rem
        height: 1rem
        background-size: 1rem

</style>
