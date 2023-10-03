<template>
  <div>
    <div
      class="progress-bar flex items-center justify-center"
      :style="{ '--width': `${percent}%` }"
    >
      <h6 class="text-blue-600 text-base">{{ timeFormat }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    timerId: null,
    timer: null,
  }),

  props: {
    timeout: {
      type: Number,
      required: true,
    },
    stopTimer: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.timer = this.timeout;
    this.setTimeOut();
  },

  methods: {
    setTimeOut() {
      this.timerId = setInterval(() => --this.timer, 1000);
    },
  },

  computed: {
    timeFormat() {
      const date = new Date(this.timer * 1000);
      const min = String(date.getMinutes());
      const sec = String(date.getSeconds());
      return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
    },
    percent() {
      return 100 - (this.timer * 100) / this.timeout;
    },
  },

  watch: {
    timer(val) {
      if (val <= 0) {
        clearInterval(this.timerId);
        this.$emit("timeout");
      }
    },
    stopTimer(val) {
      val && clearInterval(this.timerId);
    },
  },
};
</script>

<style scoped>
.progress-bar {
  --width: 0;
  --color1: theme(colors.blue.600);
  --color2: theme(colors.slate.300);
  @apply w-[68px] h-[68px] rounded-full transition;
  background: radial-gradient(
      closest-side,
      rgb(255, 255, 255) 80%,
      transparent 82% 0%
    ),
    conic-gradient(var(--color1), var(--width), var(--color2) 0%);
}
</style>
