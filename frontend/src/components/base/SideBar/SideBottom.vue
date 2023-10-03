<template>
  <div class="side-bottom">
    <button
      @click="logout"
      class="w-full click-anim text-start p-3 btn-lg btn-gray"
    >
      <div class="tflex">
        <div>
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </div>
        <div class="hidden sm:block">Logout</div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push({ name: "logout" });
      this.$flashes.alertInfo("You have been logged out");
    },
  },
};
</script>

<style scoped></style>
