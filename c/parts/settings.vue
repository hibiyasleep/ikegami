<template>
  <div class="settings-window">
    <h4>
      Settings - ikegami {{ version }} '{{ releasename }}'
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="button" @click="$emit('close')">
        <path d="M7,7l9,9z M16,7l-9,9z" stroke="#fff" />
      </svg>
    </h4>
    <div class="settings-wrap">
      <group name="Layout">
        <dropdown
          label="Element 1"
          :selections="elementSelections"
          v-model="cell_display1" />
        <dropdown
          label="Element 2"
          empty="None"
          :selections="elementSelections"
          v-model="cell_display2" />
        <checkbox
          label="Reduced Mode"
          v-model="reduced" />
        <blockquote>
          This option will hide too much detailed values, like 'Swings' or
          'Overheal', but will keep their graphs.
        </blockquote>
        <checkbox
          label="Hide name section"
          v-model="hide_name" />
        <checkbox
          label="Hide Job icons"
          :class="{ disabled: hide_name }"
          v-model="hide_job_icon" />
        <!--checkbox
          label="Debug"
          v-model="debug" />
        <blockquote>
          Show debug box about partylist tracking.
        </blockquote-->
      </group>
      <group name="Data">
        <textlist
          label="Name for merging"
          :values="username_configured_computed"
          @input="updateUsername" />
        <string
          label="(Automatically set)"
          :value="`(${uid}) ${username}`"
          disabled />
        <blockquote>
          This will be automatically detected on ACTWS or LogParse. If not, try move to another region.
        </blockquote>
        <checkbox
          label="Show .1 units"
          v-model="show_decimals" />
      </group>
      <group name="About" :opened="true">
        <p class="justify">
          <span> ikegami {{ version }} </span>
          <span> '{{ releasename }}' </span>
        </p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="344" height="24">
            <path opacity="0.25" fill="#FC73A3" d="M0,8h8v3h16v2h-16v3h-8V8h16z M2,14h4v-4H2V14z"/>
            <path opacity="0.25" fill="#FC73A3" d="M24,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M48,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M72,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M96,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M120,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M144,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M168,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M192,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M216,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M240,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M264,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M288,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="0.25" fill="#FC73A3" d="M312,8h8v3h16v2h-16v3h-8V8h8l-2,2h-4v4h4v-4l2,-2z"/>
            <path opacity="1.00" fill="#FC73A3" d="M336,8h8v8h-8v-8l2,2v4h4v-4h-4z"/>
            <path opacity="0.25" fill="#FC73A3" d="M214,18v2h-1.6l-9-9H200v2h3l9,9h2v2h10v-6H214z M222,22h-6v-2h6V22z"/>
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
import textlist from '../elements/settings/textlist.vue'

const _computedGetter = (keys) => {
  let o = {}
  for(let key of keys) {
    o[key] = {
      get() { return this.$store.state.settings[key] },
      set(v) { this.$store.commit('settings/set', { k: key, v })}
    }
  }
  return o
}

export default {
  components: {
    group,
    checkbox,
    dropdown,
    string,
    textlist
  },
  data: () => ({
    // warning: dropdown content's order are rely on object key order!
    elementSelections: {
      dps: 'DPS',
      dps1m: 'DPS (1min)',
      swings: 'Swings',
      critcounts: 'Criticals',
      critcounts_wo_direct: '(w/o Direct) Criticals',
      hps: 'HPS',
      ohpct: 'Overheal %',
      deaths: 'Deaths'
    },
    version: packageinfo.version,
    releasename: packageinfo.releasename
  }),
  methods: {
    updateUsername({ index, value }) {
      this.$store.commit('settings/updateName', { index, name: value })
    }
  },
  computed: {
    ..._computedGetter([
      'cell_display1',
      'cell_display2',
      'reduced',
      'hide_name',
      'hide_job_icon',
      'username',
      'uid',
      'username_configured',
      'show_decimals',
      'debug'
    ]),
    username_configured_computed() {
      return [].concat(this.username_configured, [''])
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
    display: block
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
  height: $ui-text-size + 0.625rem

  padding: 0 0.5rem 0 0.25rem
  line-height: 1.25rem

  text-align: right

  background-image: linear-gradient(135deg, transparent 0%, transparent 49%, #fff 50%, #fff 100%)
  background-size: 0.5rem 0.5rem
  background-position: right bottom
  background-repeat: no-repeat

</style>
