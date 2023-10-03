<template>
  <CenterBox class="min-h-screen">
    <h2 class="text-blue-600 text-center mb-5">Register</h2>
    <Form
      v-bind="$data"
      submitLabel="Sign Up"
      @succeed="userCreated"
      @validated="validated"
    />
    <p class="text-gray-700 text-center mt-5">
      Already have an account?
      <router-link class="text-blue-600 font-bold" :to="{ name: 'login' }">
        Login
      </router-link>
    </p>
  </CenterBox>
</template>

<script>
import Form from "@/components/forms/Form.vue";
import CenterBox from "@/components/UI/CenterBox.vue";
import login from "@/mixins/login.js";

export default {
  data: () => ({
    fields: {
      username: {
        help_text: ["Your identifier name"],
      },

      email: {
        attrs: { type: "email"},
      },

      password: {
        attrs: { type: "password", autocomplete: "new-password" },
        validate() {
          if (this.value.length < 8) {
            this.errors = ["Password must be at least 8 characters!"];
          } else {
            return true;
          }
        },
      },
      password2: {
        attrs: {
          type: "password",
        },
        validate(fields) {
          if (this.value !== fields.password.value) {
            this.errors = ["Passwords do not match!"];
          } else {
            return true;
          }
        },
      },
    },
    config: {
      url: "register/",
      method: "post",
    },
    isSession: false,
    successMessage: "Successfully Signed Up!",
  }),
  mixins: [login],
  components: {
    Form,
    CenterBox,
  },
  methods: {
    userCreated() {
      const username = this.fields.username.value;
      const password = this.fields.password.value;
      const data = { username, password };
      this.login(data);
    },
    validated() {
      console.log("validated!");
    },
  },
};
</script>

<style scoped></style>
