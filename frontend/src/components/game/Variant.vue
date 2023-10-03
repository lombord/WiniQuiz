<template>
  <button
    class="btn py-4"
    :class="btnClass"
    @click="!reveal && $emit('update:choice', variant)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: Number,
      required: true,
    },
    choice: {
      required: true,
    },
    reveal: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    btnClass() {
      if (this.reveal) {
        if (this.isAnswer) return "btn-green";
        if (this.choice == this.variant) return "btn-red";
      }

      return this.variant === this.choice
        ? "btn-blue"
        : "btn-outline-blue";
    },
  },
};
</script>

<style scoped></style>
