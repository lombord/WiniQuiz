<template>
  <form
    novalidate
    class="col-flex gap-5"
    v-if="loaded"
    @submit.prevent="formSubmitted"
    autocomplete="on"
  >
    <Field
      v-for="(field, key) in fields"
      :key="key"
      :name="key"
      :field="field"
    />
    <button ref="submitBtn" type="submit" class="submit-btn">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script>
import Field from "./Field.vue";

export default {
  data() {
    return {
      loaded: false,
    };
  },

  props: {
    fields: {
      type: Object,
      required: true,
    },
    submitLabel: {
      type: String,
      default: "Submit",
    },
    config: {
      type: Object,
    },
    isSession: {
      type: Boolean,
      default: true,
    },
    successMessage: {
      type: String,
      default: null,
    },
    prevent: {
      type: Boolean,
      default: false,
    },
    fetchOptions: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    data() {
      const entries = Object.entries(this.fields).map(([key, { value }]) => [
        key,
        value,
      ]);
      return Object.fromEntries(entries);
    },
    request() {
      if (this.isSession) return this.$session.request;
      return this.$request;
    },
  },

  async created() {
    this.fetchOptions && (await this.fetchServerOptions());
    this.loaded = true;
  },

  methods: {
    async fetchServerOptions() {
      const promise = this.$request.options(this.config.url);
      const response = await this.$session.animatePromise(promise);
      const method = this.config.method.toUpperCase();
      const options = response.data.actions[method];
      this.setServerOptions(options);
    },

    setServerOptions(options) {
      options = this.getWriteOnly(options);
      options.forEach(([key, op]) => {
        const field = this.fields[key] || (this.fields[key] = { attrs: {} });
        const attrs = field.attrs || (field.attrs = {});
        attrs.required = op.required;
        field.max_length = op.max_length;
        attrs.placeholder || (attrs.placeholder = op.label);
      });
    },

    getWriteOnly(options) {
      const filtered = Object.entries(options).filter(
        ({ 1: { read_only } }) => !read_only
      );
      return filtered;
    },

    formSubmitted() {
      if (this.isAllValid()) {
        if (!this.prevent) {
          return this.submit();
        }
        return this.$emit("validated", this.data);
      }
      this.$flashes.alertError("Form is invalid please try again!");
    },
    isAllValid() {
      const isValid = Object.values(this.fields).reduce((val, field) => {
        if (field.attrs.required && !field.value) {
          field.errors = ["This field is required!"];
          return false;
        }
        const { max_length } = field;
        if (max_length && field.value.length > max_length) {
          field.errors = [`Max length must be ${max_length}`];
          return false;
        }
        return val && (!field.validate || field.validate(this.fields));
      }, true);
      return isValid;
    },
    async submit() {
      const config = { ...this.config, data: this.data };
      const promise = this.request(config);
      const elm = this.$refs.submitBtn;
      try {
        const response = await this.$session.animatePromise(promise, elm);
        const msg = this.successMessage;
        msg && this.$flashes.alertSuccess(msg);
        this.$emit("succeed", response);
      } catch (error) {
        this.$flashes.alertError("Something went wrong!");
        this.setErrors(error.response.data);
      }
    },

    setErrors(errorDict) {
      Object.entries(errorDict).forEach(([key, errors]) => {
        const field = this.fields[key];
        field.errors = errors;
      });
    },
  },
  components: {
    Field,
  },
};
</script>

<style scoped>
@import "@/assets/base.css";
@import "@/assets/animations.css";
.submit-btn {
  @apply click-anim btn btn-blue mt-2 capitalize text-xl py-3;
}
</style>
