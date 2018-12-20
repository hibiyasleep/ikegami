<template>
  <label class="c-settings-input c-settings-string">
    <span class="label"> {{ label }} </span>
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" class="button" @click="assist">
      <path d="M4,4.5 h14 z M4,17.5 h14 z" stroke="#000" fill="none" />
      <path d="M11,6.5 h5 h-2.5 v9 h2.5 h-5" stroke="#000" fill="none" />
    </svg>
    <input type="text" class="input-text" :value="value" @input="input($event.target.value)" />
  </label>
</template>

<script>

export default {
  props: {
    label: String,
    value: String
  },
  methods: {
    input(value) {
      this.$emit('input', value)
    },
    assist() {
      const value = prompt(this.label + ':')
      if(value === null) return
      else this.$emit('input', value)
    }
  }
}

</script>

<style lang="sass">

.c-settings-string
  position: relative

  .button
    @include clickable
    background: #fff

  .input-text

</style>
