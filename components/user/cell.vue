<template>
  <li :class="[
    'c-user-cell',
    'class-' + combatant.job, {
      self: combatant.name == 'YOU' && highlight_self
    }]">
    <div class="user-cell-wrap">
      <graph
        class="dps-crit inside-cell"
        v-if="show_critbar"
        :value="[
          (combatant.swings - combatant.ch - combatant.dh - combatant.cdh),
          combatant.dh,
          combatant.ch,
          combatant.cdh
        ]" /> <!-- TODO: show healer graph? -->
      <label class="name-row" @click="toggleBlur">
        <i :class="[ 'icon-class', 'class-' + combatant.job ]"></i>
        <span class="name">{{ combatant.name | name(shorten_name) }}</span>
      </label>
      <var class="values">
        <span class="l">
          {{ combatant[cell_display1] | f(cell_display1, show_decimals) }}
        </span>
        <span class="r" v-if="cell_display2">
          {{ combatant[cell_display2] | f(cell_display2, show_decimals) }}
        </span>
      </var>
      <span class="ticker" :style="{ width }"></span>
    </div>
    <slot></slot>
  </li>
</template>

<script>

import { mapState } from 'vuex'
import { filters } from '@/lib/util.js'

import graph from './graph.vue'

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
      'shorten_name',
      'highlight_self'
    ]),
    width() {
      return Math.min(100, this.combatant.dps / (this.topdps || 1) * 100) + '%'
    }
  },
  filters: {
    f(value, key, show_decimals) {
      if(show_decimals !== '0' || key === 'dps' || key === 'dps1m' || key === 'hps') {
        return filters.decimal(value, show_decimals)
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

  .user-cell-wrap
    display: flex
    flex-direction: column
    justify-content: center

    width: 100%
    height: 100%

    &:hover ~ .c-details
      opacity: 1

    .name-row, .values
      text-align: center
      color: $cell-color

    .name-row
      background: none
      overflow-x: hidden
      word-break: keep-all
      white-space: nowrap
      text-overflow: ellipsis
      flex-grow: 1

      padding: 0 0 0 0.125rem
      text-shadow: $shadow-without-background

      > .icon-class
        display: inline-block
        width: 1.25rem
        height: 1.25rem

        vertical-align: -0.375rem

    .values
      display: flex

      padding: 0 0.375rem

      // background: $cell-background
      text-shadow: $shadow-with-background

      cursor: default

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
    top: $cell-line-height * 2 + 0.25rem
    left: 0

    opacity: 0

    &:hover
      opacity: 1

  .c-details-graph.inside-cell
    position: absolute
    bottom: $cell-line-height
    width: 100%
    height: 0.125rem

    z-index: $z-cell + 1

    &.dps-crit .piece:nth-child(1)
      background: transparent

  &:last-child
    margin-right: 0

// option: singleline
.singleline .c-user-cell

  .name-row
    text-align: left
    text-shadow: $shadow-with-background

  .icon-class
    margin-right: -0.25rem

  .user-cell-wrap
    flex-direction: row

// option: hide-name
.hide-name .name-row
  display: none

.singleline, .hide-name
  .c-user-cell
    height: $cell-line-height

  .c-details-graph.inside-cell
    top: 0
    bottom: unset

  .name
    margin-left: 0.25rem

  .c-details
    top: $cell-line-height + 0.25rem

// option: hide-job-icons
.hide-job-icons .c-user-cell .icon-class
  display: none

// option: blur-name
.blur-name .c-user-cell .name
    filter: blur(0.2rem)
    -webkit-filter: blur(0.2rem)

</style>
