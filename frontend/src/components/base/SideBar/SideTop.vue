<template>
  <div class="text-center sm:text-end">
    <button
      class="btn-anim click-anim2 toggle-btn"
      :class="{ 'toggle-btn-active': show }"
      @click="$emit('update:show', !show)"
    >
      <i class="fa-solid fa-eye"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
};
</script>

<style scoped>
.toggle-btn {
  @apply px-1 text-xl text-zinc-700 
  opacity-20 transition
  hover:opacity-100
  hover:text-blue-600;
  --anim-color: theme(colors.blue.200);
}

.toggle-btn-active {
  @apply text-blue-600 opacity-100;
}
</style>
