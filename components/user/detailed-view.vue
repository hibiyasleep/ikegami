<template>
  <section class="details">
    <article class="details-group dps">
      <row
        title="DPS"
        :value="c.dps | decimal" />
      <row
        title="1m"
        :value="c.dps1m | decimal" />
      <row
        title="Max"
        :value="c.maxhit" />

      <hr v-if="!reduced" />

      <row
        title="Swings"
        :value="c.swings"
        v-if="!reduced" />
      <row
        title="Swings/GC"
        :value="c.swings / e.duration * 2.5 | decimal" />
      <row
        title="D/!/!!!"
        :value="c.critcounts"
        v-if="!reduced" />
      <div class="row">
        <graph
          class="dps-crit"
          :value="[ (c.swings - c.ch - c.dh - c.cdh), c.dh, c.ch, c.cdh ]" />
      </div>
      <hr />

    </article>
    <article class="details-group healer" v-if="c.healed">
      <row
        title="HPS"
        :value="c.hps | decimal" />
      <row
        title="%"
        :value="(c.healed / e.healed) | pct" />
      <row
        title="Max"
        :value="c.maxheal" v-if="!reduced" />

      <hr v-if="!reduced" />

      <row
        title="Overheal"
        :value="(c.oh / c.healed) | pct" />
      <row
        title="By minion"
        :value="(c.minion_heal / c.healed) | pct"
        v-if="!reduced && c.minion_heal" />
      <row
        title="Shielded"
        :value="c.shield"
        v-if="!reduced" />
      <div class="row">
        <graph
          class="healer-pct"
          :value="[
            c.shield,
            (c.healed - c.minion_total - c.oh + c.minion_over - c.shield),
            c.minion_total - c.minion_over,
            c.minion_over,
            c.oh - c.minion_over
          ]" /> <!-- TODO -->
      </div>

      <hr />

    </article>
    <article class="details-group tank">
      <row
        title="Deaths"
        :value="c.deaths" />
    </article>
  </section>
</template>

<script>

import { mapState } from 'vuex'

import row from '../user/details-row.vue'
import graph from '../user/graph.vue'

export default {
  components: {
    row,
    graph
  },
  props: {
    c: Object, // combatant
    e: Object // encounter
  },
  computed: {
    ...mapState('settings', [ 'reduced' ])
  }
}

</script>

<style>

</style>
