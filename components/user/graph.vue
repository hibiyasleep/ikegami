<template>
  <div :class="[
    'c-details-graph',
    type, {
      empty: total === 0
    }
  ]">
    <span
      v-for="(v, index) in values"
      v-if="v > 0"
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
          // WARN: SHIELD ESTIMATION
          // amount of shield 'created' counted, regardness of it was effective or not
          c.shield,
          // c.healed - (total of all other graphed values)
          (c.healed - c.minion_total - (c.oh + c.minion_over)),
          // TODO: this could jump through under zero, possibly merging problem?
          c.minion_total - c.minion_over,
          c.minion_over,
          c.oh - c.minion_over // TODO confirm
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

  height: $details-row-height * 0.5

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

</style>
