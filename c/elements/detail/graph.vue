<template>
  <div class="c-details-graph">
    <span
      class="piece"
      v-for="v in value"
     :style="{ width: (v / total * 100) + '%' }"></span>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    total() {
      return this.$util.sum(this.value)
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
    //

  &.dps-crit .piece
    &:nth-child(1)
      background-color: #FFFFFF
    &:nth-child(2)
      background-color: #FF6F00
    &:nth-child(3)
      background-color: #FFCA28
    &:nth-child(4)
      background-color: #1DE9B6

  &.healer-pct .piece
    &:nth-child(1) // shielded
      background-color: #40C4FF
    &:nth-child(2) // healed (- shielded - by minion)
      background-color: #00E676
    &:nth-child(3) // healed by minion
      background-color: #B9F6CA
    &:nth-child(4) // overhealed by minion
      background-color: #EC8986
    &:nth-child(5) // overhealed by me
      background-color: #E53935
</style>
