<template>
  <span class="c-settings-input c-settings-number">
    <span class="label">
      <slot>{{ label }}</slot>
    </span>
    <span class="input">
      <button class="minus" @click="d(-step)">－</button>
      <input
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        @input="input"
        @blur="d(0)" />
      <button class="plus" @click="d(step)">＋</button>
    </span>
  </span>
</template>

<script>

export default {
  props: {
    label: String,
    value: Number,
    min: Number,
    max: Number,
    step: { type: Number, default: 1 },
    default: { type: Number, default: 1 }
  },
  methods: {
    input(e) {
      const v = parseFloat(e.target.value)
      this.$emit('input', isNaN(v)? this.default : v)
    },
    d(delta) {
      let nv = (isNaN(this.value)? this.default : this.value) + delta
      const floor = (this.value - this.min) % this.step

      if(this.min !== undefined) { // calculate step from min
        if(floor !== 0) {
          if(floor < (this.step / 2) && (nv - floor) >= this.min) {
            nv -= floor
          } else {
            nv += (this.step - floor)
          }
        } else if(nv < this.min) {
          nv = this.min
        }
      }
      if(this.max !== undefined && nv > this.max) {
        if(this.min !== undefined && floor) {
          nv -= floor // don't consider nv < min
        } else {
          nv = this.max
        }
      }
      console.log(this.min, this.max, nv)
      // falsey value but not 0
      this.$emit('input', !nv && nv !== 0? this.default : nv)
    }
  }
}

</script>

<style lang="sass">

.c-settings-number

  .input
    display: flex
    align-items: stretch

    width: $settings-input-width
    height: 1.5rem

    border: $_1px solid #fff

    > button, > input
      line-height: 1.375rem !important

    > button
      @include clickable
      width: 1.5rem

      &.minus
        border-right: $_1px solid #fff

      &.plus
        border-left: $_1px solid #fff

    > input
      flex-grow: 1
      width: 0

      text-align: center

      &, &::-webkit-inner-spin-button, &::-webkit-outer-spin-button
        appearance: none
        -webkit-appearance: none


      // background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline stroke="%23fff" fill="none" stroke-width="2" points="3 12 8 17 19 6"/></svg>')
      // background-position: center
      // background-size: 1.5rem
      // background-repeat: no-repeat

</style>
