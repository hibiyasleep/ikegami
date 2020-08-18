<template>
  <li :class="[
    'c-user-cell',
    'class-' + combatant.job, {
      self: combatant.name == 'YOU' && highlight_self
    }]">
    <div class="user-cell-wrap">
      <label class="name-row" @click="toggleBlur">
        <i :class="[ 'icon', 'class-' + combatant.job ]"></i>
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
      <div class="tickers">
        <graph
          type="dps-crit"
          v-if="tickers_dps_crit"
          :class="tickers_dps_crit"
          :combatant="combatant" />
        <graph
          type="healer-pct"
          v-if="tickers_healer_pct && show_healer_graph"
          :class="tickers_healer_pct"
          :style="{ width: Math.min(100, combatant.hps / (tophps || 1) * 100) + '%' }"
          :combatant="combatant" />
        <span class="ticker main" :style="{
          width: Math.min(100, combatant.dps / (topdps || 1) * 100) + '%'
        }"></span>
      </div>
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
    combatant: { type: Object, required: true },
    topdps: { type: Number, default: 1 },
    tophps: { type: Number, default: 1 }
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
      'tickers_dps_crit',
      'tickers_healer_pct',
      'shorten_name',
      'highlight_self'
    ]),
    show_healer_graph() {
      return (this.combatant.hps / this.tophps) > 0.05
    }
  },
  filters: {
    f(value, key, show_decimals) {
      if(key === 'dps' || key === 'dps1m' || key === 'hps') {
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
  line-height: $cell-line-height
  margin-right: $cell-margin
  font-size: $font-small

  z-index: $z-cell

  // hitbox
  background-color: rgba(0, 0, 0, 0.005)
  box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.005), 0 $cell-line-height * -1 0 $cell-background inset

  word-break: keep-all
  white-space: nowrap
  text-overflow: clip

  .user-cell-wrap
    display: flex
    flex-direction: column
    justify-content: center
    align-content: stretch

    width: 100%
    height: 100%

    &:hover ~ .c-details
      opacity: 1

    &:last-child
      margin-right: 0

    .name-row, .values
      color: $cell-color

    .name-row
      display: flex
      flex-grow: 1
      justify-content: center

      width: 100%
      margin: 0
      padding: 0
      background: none

      text-overflow: clip
      overflow-x: hidden

      > *
        vertical-align: top

      > .icon
        display: inline-block
        margin: 0.125rem

        font-size: 1.25rem
        line-height: 1em
        width: 1em

      > .name
        text-shadow: $shadow-text-without-background, $shadow-text-background
        min-width: 0

    .values
      display: flex

      padding: 0 0.375rem

      // background: $cell-background
      text-shadow: $shadow-text-background

      cursor: default

      > .l, > .r
        z-index: $z-cell + 1

      > .l
        text-align: left
        margin-right: auto

      > .r
        text-align: center

  .c-details
    position: absolute
    top: $cell-line-height * 2 + 0.25rem
    left: 0

    opacity: 0

    &:hover
      opacity: 1

  $inner-graph-height: 0.25rem / 2

  .tickers
    display: flex
    flex-direction: column
    align-content: space-between

    position: absolute
    right: 0
    bottom: 0
    left: 0
    margin: auto 0

    height: $cell-line-height
    z-index: -1

    .ticker, .c-details-graph
      position: relative
      flex-shrink: 0

      &.above
        order: 1
        margin-top: -$inner-graph-height
        transform: translateY(-1 * $_1px)
      &.top
        order: 2
        top: 0
        margin-bottom: $_1px
      &.main
        order: 3
      &.bottom
        order: 4
        bottom: 0
        margin-top: $_1px
      &.below
        order: 5
        margin-bottom: -$inner-graph-height
        transform: translateY($_1px)

    .ticker.main
      align-self: flex-start
      flex-grow: 100

    .c-details-graph
      width: calc(100% + #{$_1px})
      // TODO: redefine ↓
      height: 0.125rem
      z-index: $z-cell + 1

      &.dps-crit
        align-self: flex-end

        .piece:nth-child(1)
          background: transparent

      &.healer-pct
        align-self: flex-start


// options that makes userlist simple (singleline)
.single-value, .hide-name

  .user-cell-wrap
    flex-direction: row
    max-height: $cell-line-height

    .name-row
      justify-content: flex-start
      text-shadow: $shadow-text-background

      > .name
        text-shadow: inherit

    .icon-class
      margin-right: -0.25rem

    .values > .l
      margin-left: auto

  .c-details
    top: $cell-line-height + 0.25rem

// option: hide-name
.hide-name .user-cell-wrap

  .name-row
    flex-grow: 0

  .name
    display: none

  .values
    flex-grow: 1

.hide-name.hide-job-icons .name-row
  display: none

// option: !yield_for_subtickers
.main-ticker-will-not-yield .tickers
  .main
    margin: 0

  .top, .bottom
    position: absolute

// option: hide-job-icons
.hide-job-icons .c-user-cell .name-row

  .icon
    display: none !important

  .name
    padding-left: 0.375rem

// option: blur-name
.blur-name .c-user-cell .name
  filter: blur(0.2rem)
  -webkit-filter: blur(0.2rem)


</style>
