<template>
    <div class="flex flex-col gap-3">
      <button
        class="btn py-3 fs-5 capitalize"
        v-for="(mode, key) in modes"
        :key="key"
        :class="mode.class"
        @click="$emit('update:modelValue', mode)"
      >
        {{ key }}
      </button>
    </div>
</template>

<script>

export default {
  props: {
    modes: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: [String, null],
      required: true,
    },
  },
};
</script>

<style scoped>
.menu-box {
  max-width: 400px;
}
</style>
