<template>
  <div class="root">
    <h2 class="text-center mb-3">
      <span class="text-blue-600">Top</span> players list
    </h2>
    <div class="t-root p-4">
      <div class="table-box">
        <div class="t-row t-head">
          <div>
            <span class="badge bg-yellow-400 px-2">
              <i class="fa-solid fa-trophy"></i>
            </span>
          </div>
          <div>
            <span class="badge bg-blue-500 px-2">
              <i class="fa-solid fa-users"></i>
            </span>
          </div>
          <div>
            <span class="badge bg-green-500 px-2">
              <i class="fa-solid fa-check"></i>
            </span>
          </div>
          <div>
            <span class="badge bg-rose-500 px-2">
              <i class="fa-solid fa-xmark"></i>
            </span>
          </div>
          <div>
            <span class="badge bg-blue-500 px-2">
              <i class="fa-solid fa-star"></i>
            </span>
          </div>
        </div>
        <div v-for="user in users">
          <UserCell class="t-row" :key="user.id" :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCell from "./UserCell.vue";

export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  components: { UserCell },
};
</script>

<style scoped>
.root {
  @apply py-5;
}
.t-root {
  @apply max-w-4xl mx-auto;
}

.table-box > :not(:first-child) {
  @apply py-1;
}

.t-row {
  @apply grid gap-3 items-center;
  grid-template-columns: 0.5fr 3fr 1fr 1fr 1fr;
}
.t-row > * {
}

.t-row > :not(:nth-child(2)) {
  @apply text-center;
}

.t-head {
  @apply pb-3;
}

.t-head > * {
  @apply capitalize;
}
</style>
