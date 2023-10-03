<template>
  <div class="root-div">
    <h2 class="text-center sm:mb-2 md:mb-4">
      Welcome back
      <span class="text-blue-600">{{ user.full_name || user.username }}</span
      >!
    </h2>
    <div class="p-5 md:pb-10 rounded bg-white border">
      <h4 class="text-blue-600 text-center mb-4">
        <i class="fa-solid fa-chart-line"></i>
        Statistics
      </h4>
      <div class="tflex static-box">
        <div>
          <h5>
            <span class="badge bg-blue-600">
              {{ user.score }}
              <i class="fa-solid fa-star"></i>
            </span>
          </h5>
        </div>
        <div>
          <h5>
            <span class="badge bg-green-600">
              <i class="fa-solid fa-check"></i>
              {{ user.correct }}
            </span>
          </h5>
        </div>
        <div>
          <h5>
            <span class="badge bg-rose-600">
              <i class="fa-solid fa-xmark"></i>
              {{ user.incorrect }}
            </span>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$session.user;
    },
  },
};
</script>

<style scoped>
.root-div {
  @apply mx-auto p-3 flex flex-col gap-3 
  max-h-screen;
  width: clamp(min(400px, 100%), 70%, 700px);
}

.static-box {
  @apply justify-between bg-zinc-100 border 
  p-4 py-8 rounded-md;
}
</style>
