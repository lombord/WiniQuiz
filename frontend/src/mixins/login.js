export default {
  methods: {
    async login(data) {
      const promise = this.$session.login(data);
      try {
        await this.$session.animatePromise(promise);
        await this.$router.push({ name: "home" });
        const msg = `You have logged as ${this.$session.user.username}`;
        this.$flashes.alertInfo(msg);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
