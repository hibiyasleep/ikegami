<template>
  <div class="tab-content has-another-wrapper">
    <figure class="tab-content-presentation w-settings-layout-preview">
      <svg
        width="400"
        height="56"
        viewBox="-110 -9 400 56"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- warn: fill and stroke are inherited inside this element from CSS -->
        <defs stroke="none">
          <g id="whm-icon" x="0" y="0" width="36" height="36">
            <path
              x="8" y="8"
              transform="scale(0.75)"
              d="M19.9 13.6c.5 0 1.1.3 1.7.9.5.3.8.8.8 1.7 0 .5-.3 1-.8 1.6-.6.6-1.2.9-1.7.9-.9 0-1.4-.3-2-.9a4 4 0 0 1-.5-1.6c0-.9.2-1.4.5-1.7.6-.6 1.1-.9 2-.9m.8-3.6v.6l.6.2.3.3c2.2 1.1 3.3 2.8 3.3 5 0 1.5-.5 2.9-1.4 3.7a4 4 0 0 1-3.3 1.7c-1.2 0-2 0-2.8-.3L16 20.1h-.3c-.3-.3-.9-.6-1.1-.3v1.1c.2.3.2.6.5.9.6.8 2 1.6 3.7 2.5h.2c.6.3 1.2.5 1.2 1.1v10c0 .6 0 1.2.2 1.8.3.5.6.8.9.8.3 0 .5-.3.5-.8a4 4 0 0 0 .6-1.7V25.4c0-.3 0-.6.3-.8 0-.6.3-.6.5-.9.9-.3 1.7-1.1 2.6-2 1.4-1.6 2-3.6 2-5.5 0-1.7-.6-3.4-1.8-4.5a8 8 0 0 0-3.9-2.3H21c0 .3-.3.3-.3.6"
              />
          </g>
          <text
            id="value1"
            font-size="18"
            :x="hide_job_icon || cell_display2? 9 : 30"
            y="24.5">
            {{ shortenized_name }}
          </text>
          <text id="value2" font-size="18" x="171" y="24.5" text-anchor="end"> 1234 </text>
          <g id="content">
            <use href="#whm-icon" v-if="!hide_job_icon && !cell_display2" />
            <use href="#value1" />
            <use href="#value2" />
          </g>
          <mask id="barclip" x="0" y="0" width="180" height="36">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <g fill="black">
              <use href="#content" />
              <!-- when main ticker should yield space for subtickers -->
              <rect x="0" y="1" width="100%" height="5" v-if="yielded.top" />
              <rect x="0" y="30" width="100%" height="5" v-if="yielded.bottom" />
            </g>
          </mask>
          <mask id="rest" x="0" y="0" width="180" height="36" mask-units="objectBoundingBox">
            <rect x="100" y="0" width="180" height="36" fill="white"/>
          </mask>
        </defs>

        <g stroke="none">
          <!-- normal text -->
          <g font-size="12" fill-opacity="0.25">
            <text x="-12" y="23" text-anchor="end"> preview </text>
          </g>
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
            <rect x="0" y="0" width="10" height="3" class="piece p0" /> <!-- shielded -->
            <rect x="11" y="0" width="111" height="3" class="piece p1" /> <!-- total healed -->
            <rect x="123" y="0" width="24" height="3" class="piece p4" /> <!-- overheal -->
          </g>
          <g
            class="dps-crit"
            :transform="`translate(0, ${preview_coords[tickers_dps_crit]})`">
            <rect x="61" y="0" width="56" height="3" class="piece p1" /> <!-- dh -->
            <rect x="118" y="0" width="51" height="3" class="piece p2" /> <!-- ch -->
            <rect x="170" y="0" width="10" height="3" class="piece p3" /> <!-- cdh -->
          </g>
        </g>
        <g fill="none">
          <!-- various strokes -->
          <g stroke-width="1">
            <rect x="0.5" y="0.5" width="179" height="35" />
            <path d="M-184.5,0.5 h180 v35 h-180" stroke-opacity="0.25" />
            <path d="M364.5,0.5 h-180 v35 h180" stroke-opacity="0.25" />
            <!-- <path d="M-22.5,-12 q-6,6 0,12 t0,12 q-6,6 0,12 t0,12 q-6,6 0,12" /> -->
            <!-- <path d="M202.5,-12 q-6,6 0,12 t0,12 q-6,6 0,12 t0,12 q-6,6 0,12" /> -->
          </g>
        </g>
      </svg>
    </figure>
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
        label="Less information on detailed view"
        v-model="reduced" />
      <group name="Tickers">
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
      top: 2,
      bottom: 31,
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
      'shorten_name',
      'tickers_dps_crit',
      'tickers_healer_pct',
      'yield_for_subtickers',
      'hide_name',
      'hide_job_icon',
      'reduced'
    ]),
    shortenized_name() {
      if(this.cell_display2) {
        return '1234'
      } else if(this.hide_name) {
        return ''
      } else {
        return [
          this.hide_job_icon? 'Hibiya Inemu…' : 'Hibiya Ine…',
          'Hibiya I.',
          'H. Inemuri',
          'H. I.',
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
