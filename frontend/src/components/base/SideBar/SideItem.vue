<template>
  <div>
    <router-link :to="item.to" activeClass="item-active" class="item tflex">
      <div class="tflex">
        <div>
          <i class="icon" :class="item.icon"></i>
        </div>
        <div class="capitalize hidden sm:block">
          {{ item.title }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
@tailwind components;

@layer components {
  .item {
    @apply px-4 p-3 bg-gray-100 text-gray-700 rounded-md
    outline-2 outline-blue-500 text-lg hover:item-active;
  }
  .item-active {
    @apply bg-blue-50 text-blue-600 outline;
  }
}
</style>
