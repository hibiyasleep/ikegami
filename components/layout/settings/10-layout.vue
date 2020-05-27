<template>
  <div class="tab-content">
    <dropdown label="Values">
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
    <radio-button
      :class="[ 'equal-width', { disabled: hide_name }]"
      mode="multiple"
      label="Shortenize name as"
      :selections="new Map([
        ['2', (shorten_name & 2)? 'F.' : 'Firstname'],
        ['1', (shorten_name & 1)? 'L.' : 'Lastname']
      ])"
      :value="{
        '2': +shorten_name & 2,
        '1': +shorten_name & 1
      }"
      @input="v => shorten_name = +shorten_name ^ v" />
    <radio-button
      class="equal-width"
      mode="multiple"
      label="Nameplate"
      :selections="{
        hide_job_icon: 'Icon',
        hide_name: 'Name'
      }"
      :value="{
        hide_name: !hide_name,
        hide_job_icon: !hide_job_icon
      }"
      @input="v => this[v] = !this[v]" />
    <checkbox
      label="Show Critical graph on cell"
      v-model="show_critbar" />
    <checkbox
      label="Less information on detailed view"
      v-model="reduced" />
  </div>
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
