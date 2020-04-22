<template>
  <group name="Layout">
    <dropdown label="Elements">
      <div class="multiple-dropdown-wrap" slot="contents">
        <dropdown-body
          :selections="element_selections"
          v-model="cell_display1" />
        <dropdown-body
          empty="None"
          :selections="element_selections"
          v-model="cell_display2" />
      </div>
    </dropdown>
    <dropdown
      label="Shortenize name as"
      :selections="{
        0: 'Firstname Lastname',
        1: 'Firstname L.',
        2: 'F. Lastname',
        3: 'F. L.'
      }"
      v-model="shorten_name" />
    <checkbox
      label="Show Critical graph on cell"
      v-model="show_critbar" />
    <checkbox
      label="Hide name section"
      v-model="hide_name" />
    <checkbox
      label="Hide Job icons"
      :class="{ disabled: hide_name }"
      v-model="hide_job_icon" />
    <checkbox
      label="Reduced Mode"
      v-model="reduced" />
    <blockquote>
      This option will hide some values from detailed view, like 'Swings' or
      'Overheal' etc.
    </blockquote>
  </group>
</template>

<script>

import mapStateDynamically from '@/lib/map-state-dynamically.js'
import * as _const from '@/lib/const.js'

import * as components from './_components.js'

export default {
  components,
  data: () => ({
    element_selections: _const.CELL_DISPLAY_SELECTIONS
  }),
  computed: {
    ...mapStateDynamically('settings', [
      'cell_display1',
      'cell_display2',
      'shorten_name',
      'show_critbar',
      'hide_name',
      'hide_job_icon',
      'reduced'
    ])
  }
}

</script>
