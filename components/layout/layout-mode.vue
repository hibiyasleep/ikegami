<template>
  <nav class="c-layout-mode-wrapper window">
    <h4>
      <span>
        <b> Layout mode </b>
        -
        {{ width }}x{{ height }}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="button" @click="exit">
        <path d="M7,7l9,9z M16,7l-9,9z" stroke="#fff" />
      </svg>
    </h4>
  </nav>
</template>

<script>

export default {
  data: () => ({
    width: '---',
    height: '---',
    listener: null
  }),
  methods: {
    exit() {
      this.$store.commit('ui/toggleLayoutMode', false)
    },
    update() {
      this.width = window.innerWidth
      this.height = window.innerHeight
    }
  },
  mounted() {
    this.update()
    this.listener = () => this.update()
    window.addEventListener('resize', this.listener)
  },
  destroyed() {
    window.removeEventListener('resize', this.listener)
  }
}

</script>

<style lang="sass">

.c-layout-mode-wrapper
  @include unselectable
  display: flex
  position: absolute
  text-align: center
  right: 0
  bottom: 0
  left: 0

  width: $ui-width * 0.5
  height: $nav-height
  margin-top: 0
  text-indent: 0.5rem

  font-size: $nav-text-size

  z-index: $z-window + 100

  h4
    flex-grow: 1
    margin: 0
    text-align: center

    > span
      flex-grow: 1

</style>
