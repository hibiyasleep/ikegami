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

  // @include if-enabled('order-by-desc')

  @include if-enabled('align-left')
    justify-content: flex-start
  @include if-enabled('align-right')
    justify-content: flex-end

  $padding: $cell-width + $cell-margin

  @include if-enabled('align-left.theme-minimal')
    padding-left: $padding
  @include if-enabled('align-right.theme-minimal')
    padding-right: $padding

    $clip-horizontal: calc(100vw - #{$padding})
    $clip-vertical: calc(100% + #{$cell-margin})
    clip-path: polygon(0 0, $clip-horizontal 0, $clip-horizontal $clip-vertical, 100vw $clip-vertical, 100vw 100vh, 0 100vh)

  // trick wrapper
  // |    <==== ====>    |
  // |<==== ==== ==== ==|= ==== ====>
  > ul
    display: flex
    max-width: 100%

    align-items: flex-start
    justify-content: flex-start

    .c-user-cell
      flex-shrink: 0

      &:last-of-type
        margin-right: 0

</style>
