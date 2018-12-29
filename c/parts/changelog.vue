<template>
  <div class="window">
    <h4>
      Changelog
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="button" @click="close">
        <path d="M7,7l9,9z M16,7l-9,9z" stroke="#fff" />
      </svg>
    </h4>
    <div class="window-wrap">
      <checkbox
        v-model="never_show_changelog_again"
        class="small never-show">
        <span>
          {{ never_show_changelog_again? '' : 'this will only appear once after update.' }}
        </span>
        Never show this again
      </checkbox>
      <hr />
      <version />
      <blockquote class="center text">
        C95爆死　　　　たすけて
      </blockquote>
      <group name="0.1.1 'Hasunuma'" :opened="true">
        <p> Changelog added </p>
        <p> Color scheme can be changed (see Settings) </p>
        <class-colors />
      </group>
    </div>
  </div>
</template>


<script>

import { mapMutations } from 'vuex'

import group from '../elements/settings/group.vue'
import checkbox from '../elements/settings/checkbox.vue'
import version from '../elements/present/version.vue'
import classColors from '../elements/present/class-colors.vue'

export default {
  components: {
    group,
    checkbox,
    version,
    classColors
  },
  methods: {
    ...mapMutations('ui', [ 'close' ])
  },
  computed: {
    never_show_changelog_again: {
      get() { return this.$store.state.settings.never_show_changelog_again },
      set(v) { this.$store.commit('settings/set', { k: 'never_show_changelog_again', v }) }
    }
  }
}

</script>

<style lang="sass">

.never-show .label
  display: inline-flex

  span
    margin-right: auto

</style>
