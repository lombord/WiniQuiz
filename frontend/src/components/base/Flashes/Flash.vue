<template>
  <div :class="flash.code">
    <p>{{ flash.message }}</p>
    <button
      class="btn-anim click-anim2 px-2 py-0.5 pointer-events-auto"
      @click="$emit('remove', flash.id)"
    >
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    flash: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
