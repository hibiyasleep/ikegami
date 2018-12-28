<template>
  <div class="window">
    <h4>
      Changelog
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="button" @click="close">
        <path d="M7,7l9,9z M16,7l-9,9z" stroke="#fff" />
      </svg>
    </h4>
    <div class="window-wrap">
      <version />
      <group name="0.1.0 'Kamata'" :opened="true">
      </group>
    </div>
  </div>
</template>


<script>

import { mapMutations } from 'vuex'

import group from '../elements/settings/group.vue'
import version from '../elements/version.vue'

export default {
  components: {
    group,
    version
  },
  methods: {
    ...mapMutations('ui', [ 'close' ])
  }
}

</script>
