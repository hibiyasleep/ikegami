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
  overflow-y: auto

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
        box-shadow: 0 ($nav-height / -12) 0 $ui-color inset

  .tab-content
    flex-grow: 1
    padding: 0.5rem 1rem

    overflow-y: auto

</style>
