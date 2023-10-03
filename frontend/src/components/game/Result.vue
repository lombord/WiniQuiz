<template>
  <div class="tflex gap-y-4 res-root">
    <div class="tflex gap-y-4">
      <h4>
        <span class="badge bg-blue-600">
          {{ result.score }}
          <i class="fa-solid fa-star"></i>
        </span>
      </h4>
      <h4>
        <span class="badge text-white" :class="percentCls">
          {{ percent }}
          <i class="fa-solid fa-percent"></i>
        </span>
      </h4>
    </div>
    <div class="tflex gap-y-4">
      <h4>
        <span class="badge bg-green-600">
          <i class="fa-solid fa-check"></i>
          {{ result.correct }}
        </span>
      </h4>
      <h4>
        <span class="badge bg-rose-600">
          <i class="fa-solid fa-xmark"></i>
          {{ result.incorrect }}
        </span>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  computed: {
    percent() {
      const { correct, incorrect } = this.result;
      const total = correct + incorrect;
      return Math.round((correct * 100) / total);
    },
    percentCls() {
      if (!this.percent) {
        return "bg-black";
      }
      if (this.percent <= 30) {
        return "bg-red-600";
      } else if (this.percent <= 80) {
        return "bg-yellow-500";
      } else {
        return "bg-green-600";
      }
    },
  },
};
</script>

<style scoped>
.res-root {
  @apply justify-between p-4 gap-4 rounded-md border 
   bg-zinc-100;
}

</style>
