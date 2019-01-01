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
        <dropdown
          label="Color Scheme"
          :selections="{
            'kagerou-material': 'kagerou Material',
            'ikegami-by-role-3': 'ikegami 3-roles',
            'ikegami-by-role-5': 'ikegami 5-roles',
            'mopimopi-default': 'MopiMopi default',
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
        <checkbox
          label="Show .1 units"
          v-model="show_decimals" />
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

import group from '../elements/settings/group.vue'
import checkbox from '../elements/settings/checkbox.vue'
import dropdown from '../elements/settings/dropdown.vue'
import string from '../elements/settings/string.vue'
import textlist from '../elements/settings/textlist.vue'
import version from '../elements/present/version.vue'
import classColors from '../elements/present/class-colors.vue'

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
    textlist,
    version,
    classColors
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
      'hide_name',
      'hide_job_icon',
      'blur_name',
      'color_scheme',
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
