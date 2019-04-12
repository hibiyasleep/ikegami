<template>
  <li :class="[ 'c-user-cell', 'class-' + combatant.job, { singleline: !cell_display2 } ]">
    <graph
      class="dps-crit"
      v-if="show_critbar"
      :value="[
        (combatant.swings - combatant.ch - combatant.dh - combatant.cdh),
        combatant.dh,
        combatant.ch,
        combatant.cdh
      ]" /> <!-- TODO: show healer graph? -->
    <label @click="toggleBlur">
      <i :class="[ 'icon-class', 'class-' + combatant.job ]"></i>
      <span class="name">{{ combatant.name | name(shorten_name) }}</span>
    </label>
    <var>
      <span class="l">
        {{ combatant[cell_display1] | f(cell_display1, show_decimals) }}
      </span>
      <span class="r" v-if="cell_display2">
        {{ combatant[cell_display2] | f(cell_display2, show_decimals) }}
      </span>
    </var>
    <span class="ticker" :style="{ width }"></span>
    <slot></slot>
  </li>
</template>

<script>

import { mapState } from 'vuex'
import { filters } from '../../../lib/util.js'

import graph from '../detail/graph.vue'

export default {
  components: { graph },
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
  methods: {
    toggleBlur() {
      this.$store.commit('settings/toggle', 'blur_name')
    }
  },
  computed: {
    ...mapState('settings', [
      'cell_display1',
      'cell_display2',
      'show_decimals',
      'show_critbar',
      'shorten_name'
    ]),
    width() {
      return Math.min(100, this.combatant.dps / (this.topdps || 1) * 100) + '%'
    }
  },
  filters: {
    f(value, key, show_decimals) {
      if(key === 'dps' || key === 'dps1m' || key === 'hps') {
        return filters.decimal(value, show_decimals? 1 : 0)
      } else {
        return value
      }
    },
    name(value, type) {
      let name = value.split(' ')
      let flag = +type
      if(name !== 'YOU' && name.length >= 2) {
        if((flag & 2) && typeof name[0] === 'string') // Firstname
          name[0] = name[0][0] + '.'
        if((flag & 1) && typeof name[1] === 'string') // Lastname
          name[1] = name[1][0] + '.'
      }
      return name.join(' ')
    }
  }
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
  box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.005), 0 $cell-line-height * -1 0 $cell-background inset

  &.singleline
    height: $cell-line-height
    flex-direction: row

    > label
      text-align: left
      text-shadow: $shadow-with-background
      margin-left: 0.125rem

    .c-details
      top: $cell-line-height * 1.25

    > .c-details-graph
      top: 0
      bottom: unset

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
    flex-grow: 1

    text-shadow: $shadow-without-background

    > .icon-class
      display: inline-block
      width: 1.25rem
      height: 1.25rem

      vertical-align: -0.375rem

  > var
    display: flex

    padding: 0 0.5rem

    // background: $cell-background
    text-shadow: $shadow-with-background

    > .l, > .r
      z-index: $z-cell + 1

    > .l
      text-align: left
      margin-right: auto

    > .r
      text-align: center

  .ticker
    position: absolute
    left: 0
    bottom: 0
    height: $cell-ticker-height
    z-index: -1

  .c-details
    position: absolute
    top: $cell-line-height * 2.25
    left: 0

    opacity: 0
    pointer-events: none

    z-index: $z-details

    &:hover
      opacity: 1

  > .c-details-graph
    position: absolute
    bottom: $cell-line-height
    width: 100%
    height: 0.125rem

    z-index: $z-cell + 1

    &.dps-crit .piece:nth-child(1)
      background: transparent

.hide-name .c-user-cell
  height: $cell-line-height

  label
    display: none

  .c-details
    top: $cell-line-height * 1.25

  > .c-details-graph
    top: 0
    bottom: unset

.hide-job-icons .c-user-cell

  &.singleline label
    margin-left: 0.375rem

  label > .icon-class
    display: none

.blur-name .c-user-cell
  .name
    filter: blur(0.2rem)
    -webkit-filter: blur(0.2rem)

</style>
