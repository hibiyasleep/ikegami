<template>
  <label :class="[
    'c-settings-input',
    'c-settings-radio-button',
    'mode-' + mode
  ]">
    <span class="label">
      <slot>{{ label }}</slot>
    </span>
    <ul class="input-wrap toggles">
      <li
        v-for="[id, s] in _selections"
        @click="select(id)"
        :class="[ 'input hinted', {
          active: (value === id) || (mode === 'multiple' && value[id])
        }]"> {{ s }} </li>
    </ul>
  </label>
</template>

<script>

export default {
  props: {
    mode: {
      type: String,
      default: 'single',
      validate: v => ['single', 'multiple'].includes(v)
    },
    label: { type: String },
    selections: { type: [ Object, Map ], required: true },
    value: { type: [ String, Number, Boolean, Object ] },
    default: { type: [ String, Number, Boolean ] }
  },
  methods: {
    select(opt) {
      this.$emit('input', opt)
    }
  },
  computed: {
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
  }
}

</script>

<style lang="sass">

.c-settings-radio-button

  .toggles
    @include clickable

    display: flex
    padding: 0

    > li
      flex-grow: 1
      padding: 0 0.25rem
      margin: 0 ($_1px * 0.5)
      width: unset

      text-align: center

      &.active
        color: $ui-background
        background-color: $ui-color

      &:last-of-type
        margin-right: 0

  &.equal-width li
    flex: 1

  &.mode-single .toggles > li
    background-image: none

    &.active
      // background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><circle cx="6" cy="6" r="3" fill="#{$ui-background}" /></svg>')

  &.mode-multiple .toggles > li
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><rect x="3.5" y="4.5" width="4" height="4" fill="none" stroke="#{_esc($ui-color)}" /></svg>')

    &.active
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M3.5,5l2,2l4,-4l1.414,1.414l-5.414,5.414l-3.414,-3.414z" fill="#{_esc($ui-background)}" /></svg>')

</style>
