<template>
  <div class="flex flex-col gap-3">
    <SideItem
      v-for="(item, index) in list"
      :item="item"
      :key="index"
    ></SideItem>
  </div>
</template>

<script>
import SideItem from "./SideItem.vue";

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    SideItem,
  },
};
</script>

<style scoped></style>
