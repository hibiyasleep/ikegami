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
        <span :class="[ 'l', { zero: combatant[cell_display1] < 0.02 } ]">
          {{ v(cell_display1, show_decimals) }}
        </span>
        <span class="r" v-if="cell_display2">
          {{ v(cell_display2, show_decimals) }}
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
    },
    v(key, show_decimals) {
      let value = this.combatant[key]

      switch(key) {
        case 'dps':
        case 'dps1m':
        case 'hps':
          return filters.decimal(value, show_decimals)

        case 'ohpct':
          return filters.pct(value, 0)

        case 'critcounts':
          return value.join('/')
        case 'critpcts':
          value = this.combatant.critcounts
          return value.map(_ => (_ / this.combatant.swings * 100).toFixed(0)).join('/') + '%'

        default:
          return value
      }
    },
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
  box-shadow: 0 0 0 0.5rem rgba(0, 0, 0, 0.005) // , 0 $cell-line-height * -1 0 $cell-background inset

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

    @include if-enabled('singleline', 'hide-name')
      flex-direction: row
      max-height: $cell-line-height

    &:hover ~ .c-details
      opacity: 1

    #root.layout-mode & ~ .c-details
      opacity: 0.5
      border-bottom: $_1px solid red

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

      @include if-enabled('singleline', 'hide-name')
        justify-content: flex-start
        text-shadow: $shadow-text-background

      @include if-enabled('hide-name:not(.hide-job-icons)')
        // FIXME
        flex-basis: $cell-line-height
        flex-grow: 0

      @include if-enabled('hide-name.hide-job-icons')
        display: none

      > *
        vertical-align: top

      > .icon
        display: inline-block
        margin: 0.125rem

        flex-shrink: 0

        font-size: 1.25rem
        line-height: 1em
        width: 1em

        // @include if-enabled('singleline', 'hide-name')
        //   margin-right: -0.25rem

        @include if-enabled('hide-job-icons')
          display: none !important

      > .name
        text-shadow: $shadow-text-without-background, $shadow-text-background
        min-width: 0

        @include if-enabled('singleline')
          text-shadow: inherit

        @include if-enabled('hide-name')
          display: none

        @include if-enabled('hide-job-icons')
          padding-left: 0.375rem

        @include if-enabled('blur-name')
          filter: blur(0.2rem)
          -webkit-filter: blur(0.2rem)

    .values
      display: flex

      padding: 0 0.375rem

      // background: $cell-background
      text-shadow: $shadow-text-background

      cursor: default

      @include if-enabled('hide-name')
        flex-grow: 1

      @include if-enabled('hide-name:not(.hide-job-icons)')
        padding-left: 0

      > .l, > .r
        z-index: $z-cell + 1

      > .l
        text-align: left
        margin-right: auto

        @include if-enabled('single-value')
          margin-left: auto

        @include if-enabled('force-singleline-allowed:not(.single-value):not(.hide-name)')
          opacity: 0.666

          &.zero
            display: none

            ~ .r
              margin-left: 0

      > .r
        text-align: center

        @include if-enabled('force-singleline-allowed')
          margin-left: 0.25rem

  .c-details
    position: absolute
    top: $cell-line-height * 2 + 0.25rem
    left: 0

    opacity: 0

    @include if-enabled('singleline', 'hide-name')
      top: $cell-line-height + 0.25rem

    &:hover
      opacity: 1

  $inner-graph-height: 0.25rem * 0.5

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

    background-color: $cell-background

    @include if-enabled('cell-opaque')
      background-color: adjust-color($cell-background, $alpha: 1)

    @include if-enabled('cell-tinted')
      background-color: transparent
      box-shadow: 0 0 8rem -4rem var(--job-color, var(--job-gauge-default)) inset, 0 0 0 1rem #1116 inset

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

      @include if-enabled('main-ticker-will-not-yield')
        &.main
          margin: 0

        &.top, &.bottom
          position: absolute

    .ticker
      background: var(--job-color, var(--job-gauge-default))

      &.main
        align-self: flex-start
        flex-grow: 100

    .c-details-graph
      width: calc(100% + #{$_1px})
      height: $cell-subticker-height
      z-index: $z-cell + 1

      &.dps-crit
        align-self: flex-end

        .piece:nth-child(1)
          background: transparent

      &.healer-pct
        align-self: flex-start

</style>
