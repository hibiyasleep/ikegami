<template>
  <div :class="[ 'c-parts-userlist' ]">
    <ul>
      <cell
        v-for="c in combatants"
        :combatant="c"
        :topdps="topdps"
        :key="c.name">
        <detailed-view :c="c" :e="e" />
      </cell>
    </ul>
  </div>
</template>

<script>

import { mapState } from 'vuex'

import cell from '../user/cell.vue'
import detailedView from '../user/detailed-view.vue'

export default {
  components: {
    cell,
    detailedView
  },
  computed: {
    ...mapState('encounter', {
      combatants: 'combatants',
      topdps: 'topdps',
      e: 'encounter'
    })
  }
}

</script>

<style lang="sass">

.c-parts-userlist
  display: flex
  width: 100%

  align-items: flex-start
  justify-content: center

  // this container exists for alignment.
  // |      *------*      |
  // -> this may implemented by only one container
  // |*-------------------|---*
  // -> but this is why <ul> exists
  > ul
    display: flex
    max-width: 100%

    align-items: flex-start
    justify-content: flex-start

    .c-user-cell
      flex-shrink: 0

</style>
