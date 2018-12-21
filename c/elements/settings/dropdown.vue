<template>
  <label class="c-settings-input c-settings-dropdown" v-click-outside="close">
    <span @click="open" class="label"> {{ label }} </span>
    <span @click="open" class="input-text dropdown-label"> {{ selections[value] }} </span>
    <ul class="c-settings-dropdown-body" v-if="opened">
      <li
        v-for="(s, id) in selections"
        @click="select(id)">
        {{ s }}
      </li>
    </ul>
  </label>
</template>

<script>

export default {
  props: {
    label: { type: String },
    selections: { type: Object, required: true },
    value: { type: String }
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
  line-height: $nav-height
  max-height: 12rem
  overflow-y: auto

  background: opacify($ui-background, 0.25)

  z-index: $z-window + 10

  > li
    @include clickable
    padding: 0 calc(0.5rem + #{$_1px})
    text-align: right


</style>
