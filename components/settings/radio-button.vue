<template>
  <label class="c-settings-input c-settings-radio-button">
    <span class="label">
      <slot>{{ label }}</slot>
    </span>
    <ul class="input-toggles">
      <li
        v-for="[id, s] in _selections"
        @click="select(id)"
        :class="{
          active: (value === id) || (mode === 'multiple' && value[id])
        }"> {{ s }} </li>
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

  .input-toggles
    @include clickable

    display: flex
    padding: 0

    > li
      flex: 1
      text-align: center
      padding: 0 0.25rem

      border-right: $_1px solid #fff

      &.active
        background: $ui-color
        color: $ui-background
        margin-right: $_1px

      &:last-of-type
        margin-right: 0


</style>
