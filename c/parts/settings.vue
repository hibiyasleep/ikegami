<template>
  <div class="settings-window">
    <h4>
      Settings - ikegami {{ version }} '{{ releasename }}'
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="button" @click="$emit('close')">
        <path d="M7,7l9,9z M16,7l-9,9z" stroke="#fff" />
      </svg>
    </h4>
    <div class="settings-wrap">
      <group name="Main">
        <string
          label="Name for merging"
          v-model="username" />
        <blockquote>
          This will be automatically detected on ACTWS or LogParse. If not, try move to another region.
        </blockquote>
        <dropdown
          label="Element 1"
          :selections="elementSelections"
          v-model="cell_display1" />
        <dropdown
          label="Element 2"
          :selections="Object.assign({ '': 'None' }, elementSelections)"
          v-model="cell_display2" />
        <checkbox
          label="Reduced Mode"
          v-model="reduced" />
        <blockquote>
          This option will hide too much detailed values, like 'Swings' or
          'Overheal', but will keep their graphs.
        </blockquote>
      </group>
      <group name="Layout">
        <checkbox
          label="Hide name section"
          v-model="hide_name" />
        <checkbox
          label="Hide Job icons"
          :class="{ disabled: hide_name }"
          v-model="hide_job_icon" />
        <checkbox
          label="Debug"
          v-model="debug" />
        <blockquote>
          Show debug box about combatant tracking.
        </blockquote>
      </group>
      <group name="About" :opened="true">
        <p class="justify">
          <span> ikegami {{ version }} </span>
          <span> '{{ releasename }}' </span>
        </p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="344" height="24">
            <path opacity="0.25" fill="#FC73A3" d="M8,16H0V8h8V16z M2,14h4v-4H2V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M24,8v3H8v2h16v3h8V8H24z M30,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M48,8v3H32v2h16v3h8V8H48z M54,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M72,8v3H56v2h16v3h8V8H72z M78,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M96,8v3H80v2h16v3h8V8H96z M102,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M120,8v3h-16v2h16v3h8V8H120z M126,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M144,8v3h-16v2h16v3h8V8H144z M150,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M168,8v3h-16v2h16v3h8V8H168z M174,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M192,8v3h-16v2h16v3h8V8H192z M198,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M216,8v3h-16v2h16v3h8V8H216z M222,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M240,8v3h-16v2h16v3h8V8H240z M246,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M264,8v3h-16v2h16v3h8V8H264z M270,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M288,8v3h-16v2h16v3h8V8H288z M294,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M312,8v3h-16v2h16v3h8V8H312z M318,14h-4v-4h4V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M336,8v3h-16v2h16v3h8V8H336z M342,14h-4v-4h4V14z"/>
            <path fill="#FC73A3" d="M214,18v2h-1.6l-9-9H200v2h3l9,9h2v2h10v-6H214z M222,22h-6v-2h6V22z"/>
          </svg>
        </p>
        <p>
          © 2018- kuriyama hibiya, all rights reserved.
          <br />
          This program is disturibed under GNU GPLv3.
        </p>
      </group>
    </div>
  </div>
</template>

<script>

import packageinfo from '../../package.json'

import group from '../elements/settings/group.vue'
import checkbox from '../elements/settings/checkbox.vue'
import dropdown from '../elements/settings/dropdown.vue'
import string from '../elements/settings/string.vue'

export default {
  components: {
    group,
    checkbox,
    dropdown,
    string
  },
  data: () => ({
    elementSelections: {
      dps: 'DPS',
      dps1m: 'DPS (1min)',
      swings: 'Swings',
      critcounts: 'Critical Counts',
      hps: 'HPS',
      ohpct: 'Overheal %',
      deaths: 'Deaths'
    },
    version: packageinfo.version,
    releasename: packageinfo.releasename
  }),
  computed: {
    username: {
      get() { return this.$store.state.settings.username },
      set(v) { this.$store.commit('settings/set', { k: 'username', v })}
    },
    cell_display1: {
      get() { return this.$store.state.settings.cell_display1 },
      set(v) { this.$store.commit('settings/set', { k: 'cell_display1', v })}
    },
    cell_display2: {
      get() { return this.$store.state.settings.cell_display2 },
      set(v) { this.$store.commit('settings/set', { k: 'cell_display2', v })}
    },
    reduced: {
      get() { return this.$store.state.settings.reduced },
      set(v) { this.$store.commit('settings/set', { k: 'reduced', v })}
    },
    hide_name: {
      get() { return this.$store.state.settings.hide_name },
      set(v) { this.$store.commit('settings/set', { k: 'hide_name', v })}
    },
    hide_job_icon: {
      get() { return this.$store.state.settings.hide_job_icon },
      set(v) { this.$store.commit('settings/set', { k: 'hide_job_icon', v })}
    },
    debug: {
      get() { return this.$store.state.settings.debug },
      set(v) { this.$store.commit('settings/set', { k: 'debug', v })}
    }
  }
}

</script>

<style lang="sass">

.settings-window
  position: relative

  margin: 0.5rem auto 0 auto

  width: $ui-width
  font-size: $ui-text-size
  line-height: $ui-text-size

  background: $ui-background
  color: $ui-color

  z-index: $z-window

  h4
    display: flex
    margin: 0
    padding: 0 0 0 0.5rem
    font-weight: inherit

    height: $nav-height
    line-height: $nav-height
    font-size: $nav-text-size
    background: $ui-background

    .button
      @include clickable
      vertical-align: top
      margin-left: auto

  .settings-wrap
    line-height: $settings-element-height
    padding: 0.25rem 0 0.5rem 0

    height: 18rem
    max-height: calc(100vh - #{($cell-line-height * 2) + $nav-height + 3rem})
    overflow-y: scroll

  .c-settings-input, blockquote, p
    display: flex
    align-items: center
    margin: 0
    padding: 0

    .label
      flex-grow: 10

  blockquote
    line-height: 1.25rem
    margin-bottom: 0.75rem
    opacity: 0.5

  p
    margin: 0.25rem 0
    line-height: 1.25rem
    &.justify
      justify-content: space-between

  .disabled
    opacity: 0.25

.input-text
  border: $_1px solid #fff
  width: 10rem
  height: $ui-text-size + 0.5rem

  padding: 0 0.5rem 0 0.25rem
  line-height: 1.25rem

  text-align: right

  background-image: linear-gradient(135deg, transparent 0%, transparent 49%, #fff 50%, #fff 100%)
  background-size: 0.5rem 0.5rem
  background-position: right bottom
  background-repeat: no-repeat

</style>
