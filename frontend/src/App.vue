<template>
  <div v-if="loaded">
    <Flashes />
    <Session v-if="$session.isAuthenticated" />
    <Guest v-else />
  </div>
</template>

<script>
import Flashes from "@/components/base/Flashes";
import Session from "@/components/Session.vue";
import Guest from "@/components/Guest.vue";

export default {
  data() {
    return {
      loaded: false,
    };
  },
  props: {
    loadRouter: {
      type: Function,
      required: true,
    },
  },
  components: { Flashes, Session, Guest },

  async created() {
    const promise = this.$session.loadSession();
    await this.$session.animatePromise(promise);
    this.loadRouter();
    this.loaded = true;
  },
};
</script>

<style>
@import "@/assets/base.css";
@import "@/assets/animations.css";
</style>
