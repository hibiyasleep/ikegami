<template>
  <div class="c-parts-userlist">
    <ul>
      <cell
        v-for="c in combatants"
        :combatant="c"
        :topdps="topdps"
        :tophps="tophps"
        :key="c.name">
        <detailed-view :c="c" :e="encounter" />
      </cell>
    </ul>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

import cell from '../user/cell.vue'
import detailedView from '../user/detailed-view.vue'

export default {
  components: {
    cell,
    detailedView
  },
  computed: {
    ...mapState('encounter', [
      'topdps',
      'tophps',
      'encounter'
    ]),
    ...mapState('settings', [ 'list_order' ]),
    combatants() {
      const l = this.$store.state.encounter.combatants || []

      if(this.list_order === 'desc') {
        // assuming worst case of combatant count: 124px * 75% * 32 = 2976px
        return this.$store.state.encounter.combatants.slice(-32).reverse()
      } else {
        return this.$store.state.encounter.combatants.slice(0, 32)
      }
    }
  }
}

</script>

<style lang="sass">

.c-parts-userlist
  display: flex
  width: 100%

  align-items: flex-start
  justify-content: center

  $clip-width: $cell-width + $cell-margin

  $clip-height: calc(100% + #{$cell-margin})

  @include if-enabled('align-left')
    justify-content: flex-start
  @include if-enabled('align-right')
    justify-content: flex-end

  @include if-enabled('align-left.theme-minimal')
    padding-left: $clip-width
  @include if-enabled('align-right.theme-minimal')
    padding-right: $clip-width

  @include if-enabled('order-by-asc.align-right.theme-minimal')
    $clip-point-horizontal: calc(100vw - #{$clip-width})
    // 0                100vw
    // +-------+              < 0
    // |       | $clip-width
    // |       +------------+ < $clip-height
    // |                    |
    // +--------------------+ < 100vh
    clip-path: polygon(0 0, $clip-point-horizontal 0, $clip-point-horizontal $clip-height, 100vw $clip-height, 100vw 100vh, 0 100vh)

  @include if-enabled('order-by-desc.align-left.theme-minimal')
    // 0                100vw
    //              +-------+ < 0
    //  $clip-width |       |
    // +------------+       | < $clip-height
    // |                    |
    // +--------------------+ < 100vh
    clip-path: polygon(100vw 0, $clip-width 0, $clip-width $clip-height, 0 $clip-height, 0 100vh, 100vw 100vh)

  // trick wrapper
  // |    <==== ====>    |
  // |<==== ==== ==== ==|= ==== ====>
  > ul
    display: flex
    max-width: 100%

    align-items: flex-start
    justify-content: flex-start

    @include if-enabled('order-by-desc')
      justify-content: flex-end

    .c-user-cell
      flex-shrink: 0

      &:last-of-type
        margin-right: 0

  @include if-enabled('singleline.has-subticker-above-edge')
    margin-top: calc($cell-subticker-height + $_1px)

</style>
