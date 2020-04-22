<template>
  <group name="About" :opened="true">
    <version />
    <p>
      © 2018- kuriyama hibiya, all rights reserved.
      <br />
      This program is disturibed under GNU GPLv3.
    </p>
  </group>
</template>

<script>

import group from '@/components/settings/group.vue'
import version from '@/components/version.vue'

export default {
  components: {
    group,
    version
  }
}

</script>
