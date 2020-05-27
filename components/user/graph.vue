<template>
  <div :class="[
    'c-details-graph',
    type, {
      empty: total === 0
    }
  ]">
    <span
      v-for="(v, index) in values"
      v-if="v"
     :class="[ 'piece', 'p' + index ]"
     :style="{ 'flex-grow': v }"></span>
  </div>
</template>

<script>

export default {
  props: {
    type: { type: String, default: 'dps-crit' },
    combatant: { type: Object, required: true }
  },
  computed: {
    total() {
      return this.values.reduce((p, c) => p + (c || 0), 0)
    },
    values() {
      const c = this.combatant

      if(this.type === 'dps-crit') {
        return [
          (c.swings - c.ch - c.dh - c.cdh),
          c.dh,
          c.ch,
          c.cdh
        ]
      } else if(this.type === 'healer-pct') {
        return [
          c.shield,
          // c.healed - (total of all other graphed values)
          (c.healed - c.minion_total - c.oh + c.minion_over - c.shield),
          // TODO: this could jump through under zero, possibly merging problem?
          c.minion_total - c.minion_over,
          c.minion_over,
          c.oh - c.minion_over
        ]
      } else return []
    }
  }
}

</script>

<style lang="sass">

.c-details-graph
  display: flex
  align-items: stretch
  justify-content: center

  height: $details-row-height / 2

  > .piece
    min-width: 1px

    &.zero
      display: none

    + .piece
      margin-left: $_1px

    &:first-of-type
      margin-left: 0

  &.empty .piece
    min-width: 0

  &.dps-crit .piece
    &.p0
      background-color: #FFFFFF
    &.p1
      background-color: #1DE9B6
    &.p2
      background-color: #FFCA28
    &.p3
      background-color: #FF6F00

  &.healer-pct .piece
    &.p0 // shielded
      background-color: #40C4FF
    &.p1 // healed (- shielded - by minion)
      background-color: #00E676
    &.p2 // healed by minion
      background-color: #B9F6CA
    &.p3 // overhealed by minion
      background-color: #EC8986
    &.p4 // overhealed by me
      background-color: #E53935
</style>
