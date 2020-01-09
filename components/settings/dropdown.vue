<template>
  <label class="c-settings-input c-settings-dropdown" v-click-outside="close">
    <span @click="toggle" class="label">
      <slot>{{ label }}</slot>
    </span>
    <span @click="open" class="input-text dropdown-label"> {{ selections[value] || empty }} </span>
    <ul class="c-settings-dropdown-body" v-if="opened">
      <li
        v-if="empty"
        @click="select('')"
        :class="{ active: value === '' }">
        {{ empty }}
      </li>
      <li
        v-for="(s, id) in selections"
        @click="select(id)"
        :class="{ active: value === id }">
        {{ s }}
      </li>
    </ul>
  </label>
</template>

<script>

export default {
  props: {
    label: { type: String },
    empty: { type: String },
    selections: { type: Object, required: true },
    value: { type: [ String, Number ] }
  },
  data: () => ({
    opened: false
  }),
  methods: {
    open() {
      this.opened = true
    },
    select(opt) {
      this.$emit('input', opt)
      this.opened = false
    },
    close() {
      this.opened = false
    },
    toggle() {
      this.opened = !this.opened
    }
  }
}

</script>

<style lang="sass">

.c-settings-dropdown
  position: relative

  .input-text
    @include clickable

.c-settings-dropdown-body
  position: absolute
  top: 0.25rem
  right: 0

  width: $settings-input-width
  max-height: 13rem
  overflow-y: auto
  line-height: 1.5rem

  background: opacify($ui-background, 0.25)
  border: 1px solid white

  z-index: $z-window + 10

  > li
    @include clickable
    padding: 0 calc(0.5rem + #{$_1px})
    text-align: right

    &.active
      font-weight: 600


</style>
