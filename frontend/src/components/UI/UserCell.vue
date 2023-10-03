<template>
  <div class="t-cell" :class="userCls">
    <div class="">
      <p class="user-rank">{{ user.rank }}</p>
    </div>
    <div class="tflex">
      <div>
        <img class="user-img" :src="photo" alt="" />
      </div>
      <p class="user-name">{{ user.username }}</p>
    </div>
    <div>{{ user.correct }}</div>
    <div>{{ user.incorrect }}</div>
    <div>{{ user.score }}</div>
  </div>
</template>

<script>
const RANKS = ["t-first", "t-second", "t-third"];
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    photo() {
      const sUser = this.$session.user;
      if (this.user.username == sUser.username) {
        return sUser.photo;
      }
      return this.user.photo;
    },
    userCls() {
      return RANKS[this.user.rank - 1];
    },
  },
};
</script>

<style scoped>
.t-cell {
  @apply rounded-xl py-2 px-1 
  bg-slate-200/40;
}

.user-rank {
  @apply font-semibold w-fit mx-auto;
}

.user-img {
  @apply w-14 aspect-square object-cover rounded-xl;
}

.user-name {
  @apply md:ms-2 text-blue-600;
}
:is(.t-first, .t-second, .t-third) {
  @apply hover:bg-none;
}
.t-first {
  @apply bg-yellow-300;
}

.t-second {
  @apply bg-pink-300;
}

.t-third {
  @apply bg-sky-300;
}

:is(.t-first, .t-second, .t-third) .user-rank {
  @apply px-3 py-1 bg-black/60 rounded-xl text-white;
}

:is(.t-first, .t-second, .t-third) .user-name {
  @apply text-black;
}

.t-first .user-rank {
  @apply text-yellow-200;
}

.t-second .user-rank {
  @apply text-pink-300;
}

.t-third .user-rank {
  @apply text-sky-300;
}
</style>
