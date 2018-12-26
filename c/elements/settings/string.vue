<template>
  <label class="c-settings-input c-settings-string">
    <span class="label"> {{ label }} </span>
    <string-base v-model="value" :disabled="disabled" />
  </label>
</template>

<script>

import stringBase from './_string_base.vue'

export default {
  components: {
    stringBase
  },
  props: {
    label: String,
    value: String,
    disabled: Boolean
  }
}

</script>

<style lang="sass">

</style>
