<template>
  <window class="c-changelog-wrapper" title="Changelog" type="changelog">
    <checkbox
      v-model="never_show_changelog_again"
      class="small never-show">
      <span v-show="!never_show_changelog_again">
        this will only appear once after update.
      </span>
      <span></span>
      Never show this again
    </checkbox>
    <hr />
    <version />
    <group name="0.2.0 'Hatanodai'" :opened="true">
      <p>
        GNB/DNC support.
      </p>
      <p>
        transfer to Ōimachi Line.
      </p>
    </group>
    <group name="0.1.9 'Nagahara'">
      <p>
        Added Blue Mage support.
      </p>
    </group>
    <group name="0.1.8 'Senzoku-Ike'">
      <p>
        Critical hits and Direct hits was misplaced, so fixed this.
        <br />
        Now, order is
        <span style="color: #1DE9B6">DH</span> -
        <span style="color: #FFCA28">CH</span> -
        <span style="color: #FF6F00">CDH</span>.
      </p>
      <p> removed tailing decimal on RDPS. </p>
      <p> Shorten name is now available. </p>
      <p>
        'Theme' introduced, re-introducing april fool layout.
        <br />
        Preview:
        <u @click="theme = ''">Default</u> /
        <u @click="theme = 'minimal'">Minimal</u> /
        <u @click="theme = 'tokyu'">Tōkyū</u> /
        <u @click="theme = 'keikyu'">Keikyū</u>
      </p>
      <p> Fixed infitite reconnection attempt on 'BeforeLogLineRead' socket. </p>
    </group>
    <group name="0.1.7 'Ishikawa-dai'">
      <p> Click 'Disallow april fool' in submenu to rollback this. </p>
    </group>
    <group name="0.1.6 'Yukigaya-Ootsuka'">
      <p> (this release was updated on this station.) </p>
      <p> trying to hiding resize handle, base on OverlayPlugin settings </p>
    </group>
    <group name="0.1.5 'Ontakesan'">
      <p> (<u>On-ta-ke-san</u>. don't pronounce like <u>on-teik-sein</u>.) </p>
      <p> Critcal count graph also shown on cell (can be disabled) </p>
      <p> Deathcount will not merged from pet. </p>
    </group>
    <group name="0.1.4 'Kugahara'">
      <p> added UI scale adjustment </p>
      <p> color scheme adjusted </p>
      <p> hide name bugfix </p>
    </group>
    <group name="0.1.3 'Chidori-cho'">
      <p> fix Conjurer gauge color </p>
      <p> adjust (may) noticeable margin </p>
      <p> Nameblur added; clicking on name section will toggle it </p>
    </group>
    <group name="0.1.2 'Ikegami'">
      <p> fix 'Hide Job Icons' not working </p>
      <p> added MopiMopi color scheme </p>
    </group>
    <group name="0.1.1 'Hasunuma'">
      <p> Changelog added </p>
      <p> Color scheme can be changed (see Settings) </p>
      <class-colors style="display: flex" />
    </group>
    <group name="0.1.0 'Kamata'">
      <p> Initial commit. </p>
    </group>
  </window>
</template>


<script>

import group from '../settings/group.vue'
import checkbox from '../settings/checkbox.vue'
import window from '../window.vue'
import version from '../version.vue'
import classColors from '../class-colors.vue'

export default {
  components: {
    window,
    group,
    checkbox,
    version,
    classColors
  },
  computed: {
    never_show_changelog_again: {
      get() { return this.$store.state.settings.never_show_changelog_again },
      set(v) { this.$store.commit('settings/set', { k: 'never_show_changelog_again', v }) }
    },
    theme: {
      get() { return this.$store.state.settings.theme },
      set(v) { this.$store.commit('settings/set', { k: 'theme', v }) }
    }
  }
}

</script>

<style lang="sass">

.never-show .label
  display: inline-flex

  span
    margin-right: auto

.changelog

  .c-version p
    display: none

  .c-settings-group-content p
    @include unselectable
    display: block
    margin: 0.375rem 0

</style>
