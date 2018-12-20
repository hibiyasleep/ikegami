<template>
  <pre class="debug"><!--
--><template v-for="a in allies">{{ a.uid }}={{ a.name }} <span v-if="a.ownerid !== '0'">({{ a.job || '' }}→{{ a.ownerid }})</span>
</template><!--
-->allies↑ ({{ Object.keys(allies).length }})
party: ({{ Object.keys(party).length }})
<template v-for="p in party">{{ p }} ({{ allies[p] || '?' }})
</template><!--
-->username: {{ username }}
uid: {{ uid }}</pre>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: mapState('encounter', [ 'username', 'uid', 'allies', 'party' ])
}

</script>

<style lang="sass">

.debug
  position: fixed
  bottom: 0
  left: 0
  margin: 0
  padding: 0.5rem
  font-size: 0.75rem
  background: rgba(0, 0, 0, 0.5)
  color: #fff
  font-family: 'Roboto Mono'

</style>
