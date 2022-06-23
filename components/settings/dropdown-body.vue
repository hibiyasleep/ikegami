<template>
  <span
    @click.self="open"
    class="dropdown-label input hinted"
    v-click-outside="close">
    {{ _current }}
    <ul class="c-settings-dropdown-body" v-if="opened" ref="dropdownlist">
      <li
        v-if="empty"
        @click="select('')"
        :class="{ active: value === '' }">
        {{ empty }}
      </li>
      <li
        v-for="[id, s] in _selections"
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
    selections: { type: [ Object, Map ], required: true },
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
  computed: {
    _current() {
      if(this.selections instanceof Map) {
        return this.selections.get(this.value) || this.empty
      } else {
        return this.selections[this.value] || this.empty
      }
    },
    _selections() {
      if(this.selections instanceof Map) {
        return Array.from(this.selections.entries())
      } else {
        let r = []
        let keys = Object.keys(this.selections)
        for(let k of keys) {
          r.push([k, this.selections[k]])
        }
        return r
      }
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
  @include clickable

  position: relative

.c-settings-dropdown-body
  position: absolute
  top: 0
  right: 0

  width: 100%
  max-height: 15rem
  overflow-y: auto
  line-height: 1.5rem

  background: opacify($ui-background, 0.25)
  box-shadow: 0 0 0 $_1px inset

  z-index: $z-window + 10

  > li
    @include clickable
    padding: 0 0.5rem
    text-align: right

    text-overflow: clip
    overflow: hidden
    word-wrap: keep-all
    white-space: nowrap

    &.active
      font-weight: 600
      box-shadow: -0.25rem 0 inset
      background-color: transparentize($ui-color, 0.8)

</style>
