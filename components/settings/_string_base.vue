<template>
  <span :class="[ 'c-settings-input-string-wrap', { disabled } ]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      class="button"
      @click="assist"
      v-if="!disabled">
      <rect x="0" y="0" width="24" height="24" fill="#fff" />
      <path d="M5,5.5 h14 z M5,18.5 h14 z" stroke="#000" fill="none" />
      <path d="M12,7.5 h5 h-2.5 v9 h2.5 h-5" stroke="#000" fill="none" />
    </svg>
    <input
      type="text"
      class="input hinted"
      :value="value"
      @input="input"
      :disabled="disabled"
      :placeholder="placeholder" />
  </span>
</template>

<script>

export default {
  props: {
    label: String,
    value: String,
    disabled: Boolean,
    placeholder: String
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value)
    },
    assist() {
      const v = prompt(this.label + ':', this.value)
      if(v === null) return
      else this.$emit('input', v)
    }
  }
}

</script>

<style lang="sass">

.c-settings-input-string-wrap
  display: inline-flex
  align-items: center

  height: 100%

  .button
    @include clickable

  .input-text
    vertical-align: top

</style>
