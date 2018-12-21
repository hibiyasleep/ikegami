<template>
  <div class="c-settings-group">
    <h5 @click="show = !show">
      {{ name }}
      <button :class="{ show }"></button>
    </h5>
    <div class="c-settings-group-content" v-if="show">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    name: String,
    opened: Boolean
  },
  data: () => ({
    show: false
  }),
  mounted() {
    if(this.opened) {
      this.show = true
    }
  }
}

</script>

<style lang="sass">

.c-settings-group

  > h5
    @include clickable
    display: flex
    margin: 0
    padding: 0 0.25rem 0 1rem

    font-weight: 600

    height: $settings-element-height
    font-size: inherit

    > button
      position: relative
      margin-left: auto

      width: $settings-element-height
      height: $settings-element-height

      outline: none

      &::after
        display: inline-block
        content: ''

        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        margin: auto

        width: 0.375rem
        height: 0.375rem

        border: solid #fff
        border-width: 0 0.125rem 0.125rem 0

        transform: rotate(-45deg)

      &.show::after
        transform: rotate(0deg)

.c-settings-group-content
  padding: 0 1rem 0 2.25rem

</style>
