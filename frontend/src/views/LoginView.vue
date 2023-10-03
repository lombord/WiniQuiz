<template>
  <CenterBox class="min-h-screen">
    <div ref="box">
      <h3 class="text-blue-600 text-center mb-6">Wini Quiz</h3>
      <Form v-bind="$data" @validated="login" />
      <p class="text-gray-700 text-center mt-5">
        Haven't signed up yet?
        <router-link class="text-blue-600 font-bold" :to="{ name: 'register' }">
          Sign Up
        </router-link>
      </p>
    </div>
  </CenterBox>
</template>

<script>
import Form from "@/components/forms/Form.vue";
import CenterBox from "@/components/UI/CenterBox.vue";
import login from "@/mixins/login.js";

export default {
  data() {
    return {
      fields: {
        username: {},
        password: {
          attrs: {
            type: "password",
          },
        },
      },
      isSession: false,
      submitLabel: "login",
      prevent: true,
      fetchOptions: false,
    };
  },
  mixins: [login],
  methods: {
    async login(data) {
      const promise = this.$session.login(data);
      try {
        await this.$session.animatePromise(promise, this.$refs.box);
        this.$router.push({ name: "home" });
      } catch (error) {
        this.$flashes.alertError("Login or password is wrong!");
      }
    },
  },

  components: {
    Form,
    CenterBox,
  },
};
</script>

<style scoped></style>
