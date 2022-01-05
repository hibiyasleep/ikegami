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
    <radio-button
      class="equal-width"
      label="Sort"
      :selections="new Map([
        [ 'asc', '▼' ],
        [ 'desc', '▲' ]
      ])"
      v-model="list_order" />
    <radio-button
      class="equal-width"
      label="Align"
      :selections="new Map([
        [ 'left', '←' ],
        [ 'center', '◯' ],
        [ 'right', '→' ]
      ])"
      v-model="list_align" />
    <group name="More">
      <checkbox
        label="Force singleline with short values"
        v-model="force_inline_short_values" />
      <checkbox
        label="Less information on detailed view"
        v-model="reduced" />
      <number
        label="Hide after (sec)"
        :min="0"
        :max="60"
        :step="1"
        :default="10"
        v-model="hide_after" />
    </group>
    <group name="Tickers">
      <figure class="tab-content-presentation w-settings-layout-preview">
        <svg
          width="372"
          height="56"
          viewBox="-96 -9 372 56"
          style="width: 100%; height: 100%;"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- warn: fill and stroke are inherited inside this element from CSS -->
          <defs stroke="none">
            <g id="whm-icon" x="0" y="0" width="36" height="36">
              <text x="16" y="32" font-family="FFXIVAppIcons" font-size="28" text-anchor="middle"> &#xf024; </text>
            </g>
            <text
              id="value1"
              font-size="18"
              :x="hide_job_icon || (cell_display2 && !hide_name)? 9 : 30"
              y="24.5">
              {{ shortenized_name }}
            </text>
            <text id="value2" font-size="18" x="171" y="24.5" text-anchor="end"> 1234 </text>
            <g id="content">
              <use href="#whm-icon" v-if="!hide_job_icon && (!cell_display2 || hide_name)" />
              <use href="#value1" />
              <use href="#value2" />
            </g>
            <mask id="barclip" x="0" y="0" width="180" height="36">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <g fill="black">
                <use href="#content" />
                <!-- when main ticker should yield space for subtickers -->
                <rect x="0" y="0" width="100%" height="4" v-if="yielded.top" />
                <rect x="0" y="32" width="100%" height="4" v-if="yielded.bottom" />
              </g>
            </mask>
            <mask id="rest" x="0" y="0" width="180" height="36" mask-units="objectBoundingBox">
              <rect x="100" y="0" width="180" height="36" fill="white"/>
            </mask>
          </defs>

          <g stroke="none">
            <!-- normal text -->
            <g font-size="12" fill-opacity="0.25">
              <!-- <text x="-12" y="23" text-anchor="end"> preview </text> -->
            </g>
            <!-- background -->
            <!-- <rect x="-184" y="0" width="180" height="36" fill-opacity="0.1" /> -->
            <rect x="0" y="0" width="180" height="36" fill-opacity="0.1" />
            <!-- <rect x="184" y="0" width="180" height="36" fill-opacity="0.1" /> -->
            <!-- filled gauge region -->
            <g mask="url(#barclip)">
              <rect x="0" y="0" width="100" height="36" />
            </g>
            <!-- rest gauge region -->
            <g mask="url(#rest)">
              <use href="#content" font-weight="lighter" />
            </g>
            <!-- subtickers -->
            <g
              class="healer-pct"
              :transform="`translate(0, ${preview_coords[tickers_healer_pct]})`">
              <rect x="0" y="0" width="15" height="3" class="piece p0" /> <!-- shielded -->
              <rect x="16" y="0" width="57" height="3" class="piece p1" /> <!-- total healed -->
              <rect x="74" y="0" width="12" height="3" class="piece p4" /> <!-- overheal -->
            </g>
            <g
              class="dps-crit"
              :transform="`translate(0, ${preview_coords[tickers_dps_crit]})`">
              <rect x="61" y="0" width="56" height="3" class="piece p1" /> <!-- dh -->
              <rect x="118" y="0" width="51" height="3" class="piece p2" /> <!-- ch -->
              <rect x="170" y="0" width="10" height="3" class="piece p3" /> <!-- cdh -->
            </g>
            <!-- legend -->
            <g font-size="12" fill-opacity="0.5">
              <!-- left -->
              <g
                v-if="tickers_dps_crit"
                class="dps-crit"
                transform="translate(-86, -4)">
                <g transform="translate(0, 0)">
                  <rect width="4" height="14" class="piece p1" />
                  <text x="8" y="11.3"> direct </text>
                </g>
                <g transform="translate(0, 16)">
                  <rect width="4" height="14" class="piece p2" />
                  <text x="8" y="11.3"> crit </text>
                </g>
                <g transform="translate(0, 32)">
                  <rect width="4" height="14" class="piece p3" />
                  <text x="8" y="11.3"> crit direct </text>
                </g>
              </g>
              <g
                v-if="tickers_healer_pct"
                class="healer-pct"
                text-anchor="end"
                transform="translate(262, -4)">
                <g transform="translate(0, 0)">
                  <rect width="4" height="14" class="piece p0" />
                  <text x="-4" y="11.3"> shielded </text>
                </g>
                <g transform="translate(0, 16)">
                  <rect width="4" height="10" class="piece p1" y="4" />
                  <rect width="4" height="4" class="piece p2" />
                  <text x="-4" y="11.3"> healed </text>
                </g>
                <g transform="translate(0, 32)">
                  <rect width="4" height="10" class="piece p4" y="4" />
                  <rect width="4" height="4" class="piece p3" />
                  <text x="-4" y="11.3"> overhealed </text>
                </g>
              </g>
            </g>
          </g>
          <g fill="none">
            <!-- various strokes -->
            <g stroke-width="1">
              <!-- <rect x="0.5" y="0.5" width="179" height="35" /> -->
              <!-- <path d="M-22.5,-12 q-6,6 0,12 t0,12 q-6,6 0,12 t0,12 q-6,6 0,12" /> -->
              <!-- <path d="M202.5,-12 q-6,6 0,12 t0,12 q-6,6 0,12 t0,12 q-6,6 0,12" /> -->
            </g>
          </g>
        </svg>
      </figure>
      <radio-button
        :class="[ 'equal-width' ]"
        label="Critical hits"
        :selections="ticker_selections"
        :value="tickers_dps_crit"
        @input="updateTickerOption('tickers_dps_crit', $event)" />
      <radio-button
        :class="[ 'equal-width' ]"
        label="Healed percentages"
        :selections="ticker_selections"
        :value="tickers_healer_pct"
        @input="updateTickerOption('tickers_healer_pct', $event)" />
      <checkbox
        label="Yield space of main ticker for subtickers"
        v-model="yield_for_subtickers" />
    </group>
  </div>
</template>

<script>

import mapStateDynamically from '@/lib/map-state-dynamically.js'
import * as _const from '@/lib/const.js'

import * as components from './_components.js'

export default {
  components,
  data: () => ({
    element_selections: _const.CELL_DISPLAY_SELECTIONS,
    ticker_selections: _const.TICKER_POSITION_SELECTIONS,
    preview_coords: {
      above: -4,
      top: 0,
      bottom: 33,
      below: 37,
      '': 1000
    }
  }),
  methods: {
    updateTickerOption(key, value) {
      let otherkeys = ['tickers_dps_crit', 'tickers_healer_pct'].filter(_ => _ !== key)
      let before = this[key]
      let conflict = otherkeys.find(_ => this[_] === value)
      if(conflict) {
        this[conflict] = before
      }
      this[key] = value
    }
  },
  computed: {
    ...mapStateDynamically('settings', [
      'cell_display1',
      'cell_display2',
      'force_inline_short_values',
      'shorten_name',
      'tickers_dps_crit',
      'tickers_healer_pct',
      'yield_for_subtickers',
      'hide_name',
      'hide_job_icon',
      'hide_after',
      'list_order',
      'list_align',
      'reduced'
    ]),
    shortenized_name() {
      if(this.cell_display2) {
        return '1234'
      } else if(this.hide_name) {
        return ''
      } else {
        return [
          this.hide_job_icon? 'Yoshi\'p Sampo' : 'Yoshi\'p Sa…',
          'Yoshi\'p S.',
          'Y. Sampo',
          'Y. S.',
        ][this.shorten_name]
      }
    },
    tickers() {
      return [
        this.tickers_dps_crit,
        this.tickers_healer_pct
      ]
    },
    yielded() {
      if(!this.yield_for_subtickers)
        return {}

      return {
        top: this.tickers.some(_ => _ === 'top'),
        bottom: this.tickers.some(_ => _ === 'bottom')
      }
    }
  }
}

</script>

<style lang="sass">

.w-settings-layout-preview
  height: 3.5rem // 56

</style>
