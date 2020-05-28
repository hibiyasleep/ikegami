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

$graph-palette-dps-crit: #FFFFFF #1DE9B6 #FFCA28 #FF6F00
$graph-palette-healer-pct: #40C4FF #00E676 #B9F6CA #EC8986 #E53935

$graph-palette: (dps-crit: $graph-palette-dps-crit, healer-pct: $graph-palette-healer-pct)

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

@each $name in ('dps-crit' 'healer-pct')
  &.#{$name} .piece
    $palette: map-get($graph-palette, $name)

    $index: -1
    @each $color in $palette
      $index: $index + 1

      &.p#{$index}
        background-color: $color
        fill: $color

</style>
