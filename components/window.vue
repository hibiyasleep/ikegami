<template functional>
  <div class="window">
    <h4>
      {{ props.title }}
      <slot name="subtitle"></slot>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" width="1.5rem" height="1.5rem"
        class="button"
        @click="listeners.close? $emit('close') : parent.$store.commit('ui/close')">
        <slot name="close-button">
          <path d="M7,7l9,9z M16,7l-9,9z" class="stroke" />
        </slot>
      </svg>
    </h4>
    <div :class="[ 'window-wrap', props.type ]">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: { type: String, required: true },
    type: { type: String }
  }
}

</script>
