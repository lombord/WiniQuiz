<template>
  <input
    class="input"
    type="text"
    :placeholder="$attrs.placeholder || $attrs.name"
    v-model="value"
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      required: true,
    },
  },
  beforeMount() {},
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
};
</script>

<style scoped>
.input {
  @apply px-4 py-2 outline outline-2 rounded-md outline-gray-200
  transition-all
  duration-200
  shadow-sm placeholder:capitalize
  hover:outline-blue-500
  focus:outline-blue-500;
}
</style>
