<template>
  <div>
    <div v-if="loaded">
      <UserTable :users="users" />
      <div v-int="intersected" class="load-anim py-4 mt-3"></div>
    </div>
  </div>
</template>

<script>
import UserTable from "@/components/UI/UserTable.vue";
export default {
  data: () => ({
    users: [],
    loaded: false,
    next: null,
  }),
  mounted() {
    this.loadUsers();
  },

  methods: {
    async loadUsers() {
      const promise = this.$session.request({ url: "users/" });
      const response = await this.$session.animatePromise(promise, this.$el);
      this.updateUsers(response.data);
      this.loaded = true;
    },

    updateUsers({ results, next }) {
      this.users.push(...results);
      this.next = next;
    },

    async loadNext() {
      const cfg = { url: this.next, baseURL: "" };
      const response = await this.$session.request(cfg);
      this.updateUsers(response.data);
    },

    intersected(elm) {
      if (!this.next) {
        elm.classList.add("hidden");
        return true;
      }
      this.loadNext();
    },
  },
  components: { UserTable },
};
</script>

<style scoped></style>
