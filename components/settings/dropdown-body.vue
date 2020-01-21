<template>
  <span
    @click.self="open"
    class="input-text dropdown-label"
    v-click-outside="close">
    {{ selections[value] || empty }}
    <ul class="c-settings-dropdown-body" v-if="opened" ref="dropdownlist">
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
  </span>
</template>

<script>

export default {
  props: {
    empty: { type: String },
    selections: { type: Object, required: true },
    value: { type: [ String, Number, Boolean ] }
  },
  data: () => ({
    opened: false
  }),
  methods: {
    open() {
      this.opened = true
      this.$nextTick(() => this.$refs.dropdownlist?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      }))
    },
    close() {
      this.opened = false
    },
    select(opt) {
      this.opened = false
      this.$emit('input', opt)
    },
    toggle() {
      this.opened = !this.opened
    }
  },
  mounted() {
    // auto conversion from Boolean, to Number/String
    if(typeof this.value === 'boolean') {
      const n = this.value + 0
      // try Number first
      if('0' in this.selections && '1' in this.selections) {
        this.select(n + '')
      }
      // String (true/false) not used currently
    }
  }
}

</script>

<style lang="sass">

.dropdown-label
  position: relative

.c-settings-dropdown-body
  position: absolute
  top: 0
  right: 0

  width: 100%
  max-height: 14rem
  overflow-y: auto
  line-height: 1.5rem

  background: opacify($ui-background, 0.25)
  box-shadow: 0 0 0 1px inset

  z-index: $z-window + 10

  > li
    @include clickable
    padding: 0 calc(0.5rem + #{$_1px})
    text-align: right

    &.active
      font-weight: 600
      box-shadow: -0.25rem 0 inset
      background-color: transparentize($ui-color, 0.8)

</style>
