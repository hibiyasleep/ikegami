<template>
  <div class="tab-container">
    <ul class="tab-list">
      <li
        v-for="([id, tab]) in tabs"
        :class="{ active: current === id }"
        @click="$emit('navigate', id)">
        {{ tab }}
      </li>
    </ul>
    <slot :name="current"></slot>
  </div>
</template>

<script>

export default {
  props: {
    tabs: Map,
    current: String
  }
}

</script>

<style lang="sass">

.tab-container
  display: flex
  flex-direction: column

  height: 100%
  overflow-y: hidden

  .tab-list
    display: flex
    justify-content: center
    background: $window-title-background
    font-size: $nav-text-size
    line-height: $nav-height

    li
      @include clickable
      padding: 0 0.5rem

      &.active
        box-shadow: 0 -0.125rem 0 $ui-color inset

  .tab-content
    flex-grow: 1
    padding: 0.5rem 0.5rem 0.5rem 1rem

    overflow-y: scroll

    &.has-another-wrapper
      display: flex
      flex-direction: column
      padding: 0

      overflow-y: hidden

  .tab-content-presentation
    @include unselectable
    flex-shrink: 0
    text-align: center
    margin: 0.25rem 0 0 0
    background: $window-title-background

    overflow: hidden

    img, svg
      vertical-align: top
      fill: $ui-color
      stroke: $ui-color

    // figcaption
    //   background: $window-title-background
    //   font-size: $nav-text-size
    //   line-height: $nav-height


</style>
