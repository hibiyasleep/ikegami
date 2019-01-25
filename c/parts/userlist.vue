<template>
  <div class="c-parts-userlist">
    <ul>
      <cell
        v-for="c in combatants"
        :combatant="c"
        :topdps="topdps"
        :key="c.name">
        <detail-wrap>
          <article class="details-group dps"> <!-- wrap; do nothing but row stylings -->
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
                :value="[ (c.swings - c.ch - c.dh - c.cdh), c.ch, c.dh, c.cdh ]" />
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
        </detail-wrap>
      </cell>
    </ul>
  </div>
</template>

<script>

import { mapState } from 'vuex'

import cell from '../elements/user/cell.vue'
import detailWrap from '../elements/detail/wrap.vue'
import row from '../elements/detail/row.vue'
import graph from '../elements/detail/graph.vue'

export default {
  components: {
    cell,
    detailWrap,
    row,
    graph
  },
  computed: {
    ...mapState('settings', [ 'reduced' ]),
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
