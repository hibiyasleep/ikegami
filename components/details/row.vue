<template>
  <div class="c-details-row row">
    <span class="title">
      {{ title }}
    </span>
    <var class="values" v-for="v in values"> {{ v }} </var>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    value: { required: true }
  },
  computed: {
    values() {
      if(Array.isArray(this.value)) {
        return this.value
      } else {
        return [this.value]
      }
    }
  }
}

</script>

<style lang="sass">

.c-details-row
  display: flex
  flex-wrap: wrap

  font-size: $details-text-size
  line-height: $details-row-height

  > .title
    text-align: left
    flex-shrink: 1

  > .values
    text-align: right
    flex-grow: 1

    height: $details-row-height
    max-width: 100%
    overflow-x: hidden
    word-break: keep-all
    text-overflow: ellipsis
    white-space: nowrap

    & + .values
      width: 100%
      opacity: 0.5

</style>
