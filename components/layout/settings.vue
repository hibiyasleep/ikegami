<template>
  <div class="window">
    <h4>
      Settings - ikegami {{ version }} '{{ releasename }}'
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="button" @click="close">
        <path d="M7,7l9,9z M16,7l-9,9z" stroke="#fff" />
      </svg>
    </h4>
    <div class="window-wrap">
      <group name="Layout">
        <dropdown label="Elements">
          <div class="multiple-dropdown-wrap" slot="contents">
            <dropdown-body
              :selections="elementSelections"
              v-model="cell_display1" />
            <dropdown-body
              empty="None"
              :selections="elementSelections"
              v-model="cell_display2" />
          </div>
        </dropdown>
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
      <group name="Appearance">
        <!-- 62.5 = 10px = usual zoomout limit -->
        <number
          label="UI Scale (%)"
          :min="62.5"
          :max="300"
          :step="6.25"
          :default="100"
          v-model="ui_scale" />
        <dropdown
          label="Theme"
          empty="Default"
          :selections="{
            'minimal': 'Minimal',
            'tokyu': 'Tōkyū Ikegami Line',
            'keikyu': 'Keikyū Line'
          }"
          v-model="theme" />
        <dropdown
          label="Color Scheme"
          :selections="{
            'kagerou-material': 'kagerou Material',
            'mopimopi-default': 'MopiMopi default',
            'amethyst': 'Amethyst',
            'ikegami-by-role-3': 'ikegami 3-roles',
            'ikegami-by-role-5': 'ikegami 5-roles',
            'mopimopi-by-role': 'MopiMopi 3-roles'
          }"
          v-model="color_scheme" />
        <class-colors />
        <checkbox
          label="Blur out usernames"
          v-model="blur_name" />
        <blockquote>
          This can be toggled by left-clicking on username.
        </blockquote>
      </group>
      <group name="Data">
        <dropdown
          label="Shorten name as"
          :selections="{
            0: 'Firstname Lastname',
            1: 'Firstname L.',
            2: 'F. Lastname',
            3: 'F. L.'
          }"
          v-model="shorten_name" />
        <dropdown
          label="Decimal format"
          :selections="{
            1: '12345.6',
            0: '12346',
            '-4': '12.3k'
          }"
          v-model="show_decimals" />
        <textlist
          label="Name for merging"
          :values="username_configured_computed"
          @input="updateUsername" />
        <string
          label="(Automatically set)"
          :value="`(${uid}) ${username}`"
          disabled />
        <blockquote>
          If multiple pet (including other's) detected as yours, it'll cause duplication of merging.
          <br />
          Name will be automatically detected on ACTWS or LogParse. If not, try move to another region.
        </blockquote>
      </group>
      <group name="About" :opened="true">
        <version />
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

import { mapMutations } from 'vuex'

import packageinfo from '../../package.json'

import group from '../settings/group.vue'
import checkbox from '../settings/checkbox.vue'
import dropdown from '../settings/dropdown.vue'
import dropdownBody from '../settings/dropdown-body.vue'
import number from '../settings/number.vue'
import string from '../settings/string.vue'
import textlist from '../settings/textlist.vue'
import version from '../version.vue'
import classColors from '../class-colors.vue'

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
    dropdownBody,
    number,
    string,
    textlist,
    version,
    classColors
  },
  data: () => ({
    // warning: dropdown content's order are rely on object key order!
    elementSelections: {
      dps: 'DPS',
      dps1m: '(1min) DPS',
      swings: 'Swings',
      critcounts: 'Criticals',
      critcounts_wo_direct: '(w/o Direct) Crits',
      hps: 'HPS',
      ohpct: 'Overheal %',
      deaths: 'Deaths'
    },
    version: packageinfo.version,
    releasename: packageinfo.releasename
  }),
  methods: {
    ...mapMutations('ui', [ 'close' ]),
    updateUsername({ index, value }) {
      this.$store.commit('settings/updateName', { index, name: value })
    }
  },
  computed: {
    ..._computedGetter([
      'cell_display1',
      'cell_display2',
      'reduced',
      'ui_scale',
      'show_critbar',
      'shorten_name',
      'hide_name',
      'hide_job_icon',
      'blur_name',
      'color_scheme',
      'username',
      'uid',
      'username_configured',
      'show_decimals',
      'debug',
      'theme'
    ]),
    username_configured_computed() {
      return [].concat(this.username_configured, [''])
    }
  }
}

</script>

<style lang="sass">

.input-text
  display: inline-block
  width: $settings-input-width
  height: $ui-text-size + 0.625rem

  box-shadow: 0 0 0 $_1px #fff inset
  padding: 0 0.5rem 0 0.25rem
  line-height: 1.375rem

  text-align: right

  background-image: linear-gradient(135deg, transparent 0%, transparent 49%, #fff 50%, #fff 100%)
  background-size: 0.5rem 0.5rem
  background-position: right bottom
  background-repeat: no-repeat

.multiple-dropdown-wrap
  display: flex

  .dropdown-label
    width: $settings-input-width * 0.8

    + .dropdown-label
      margin-left: 0.25rem

</style>
