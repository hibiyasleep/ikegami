<template>
  <li :class="[ 'c-user-cell', 'class-' + combatant.job ]">
    <label>
      <i :class="[ 'class', 'class-' + combatant.job ]"></i>
      {{ combatant.name }}
    </label>
    <var>
      <span class="l">
        {{ combatant[cell_display1] }}
      </span>
      <span class="r" v-if="cell_display2">
        {{ combatant[cell_display2] }}
      </span>
    </var>
    <span class="ticker" :style="{ width }"></span>
    <slot></slot>
  </li>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: {
    combatant: {
      type: Object,
      required: true
    },
    topdps: {
      type: Number,
      default: 1
    }
  },
  computed: Object.assign({},
    mapState('settings', [ 'cell_display1', 'cell_display2' ]), {
    width() {
      return Math.min(100, this.combatant.dps / (this.topdps || 1) * 100) + '%'
    }
  })
}

</script>

<style lang="sass">

.c-user-cell
  @include unselectable
  display: flex
  flex-direction: column
  position: relative

  width: $cell-width
  height: $cell-line-height * 2
  line-height: $cell-line-height
  margin-right: $cell-margin
  font-size: $font-small

  z-index: $z-cell

  // hitbox
  background-color: rgba(0, 0, 0, 0.005)
  box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.005)

  > label, > var
    text-align: center
    color: $cell-color

    &:hover ~ .c-details
      opacity: 1

  > label
    background: none
    overflow-x: hidden
    word-break: keep-all
    white-space: nowrap
    text-overflow: ellipsis

    text-shadow: $shadow-without-background

    > i.class
      display: inline-block
      width: 1.25rem
      height: 1.25rem

      vertical-align: -0.375rem

  > var
    display: flex

    padding: 0 0.5rem

    background: $cell-background
    text-shadow: $shadow-with-background

    > .l, > .r
      z-index: $z-cell + 1

    > .l
      text-align: center

    > .r
      text-align: right
      margin-left: auto

  .ticker
    position: absolute
    left: 0
    bottom: 0
    height: $cell-ticker-height
    z-index: -1

  .c-details
    position: absolute
    top: $cell-line-height * 2.25

    opacity: 0
    pointer-events: none

    z-index: $z-details

    &:hover
      opacity: 1

</style>
