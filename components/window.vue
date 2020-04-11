<template>
  <div class="window">
    <h4>
      {{ title }}
      <slot name="subtitle"></slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" width="1.5rem" height="1.5rem"
        class="button"
        @click="close">
        <slot name="close-button">
          <path d="M7,7l9,9z M16,7l-9,9z" stroke="#fff" />
        </slot>
      </svg>
    </h4>
    <div :class="[ 'window-wrap', type ]">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: { type: String, required: true },
    type: { type: String }
  },
  methods: {
    close() {
      if(this.$listeners?.close) {
        this.$emit('close')
      } else {
        this.$store.commit('ui/close')
      }
    }
  }
}

</script>
