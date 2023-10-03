<template>
  <div class="msg-root" v-if="flashes.length">
    <div class="msg-box">
      <TransitionGroup name="flash">
        <Flash
          v-for="flash in flashes"
          :key="flash.id"
          :flash="flash"
          @remove="this.$flashes.removeFlash"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import Flash from "./Flash.vue";
export default {
  computed: {
    flashes() {
      return this.$flashes.messages;
    },
  },
  components: { Flash },
};
</script>

<style scoped>
.msg-root {

  @apply fixed w-full top-4 pointer-events-none flex justify-center z-[100];
}

.msg-box {
  @apply flex flex-col gap-2 msg-root;
  width: min(470px, 100%);
}

.msg-box > * {
  @apply px-4 py-3 rounded text-white
  justify-between flex items-center
  gap-3 flex-wrap;
}

.msg-box > .success {
  @apply bg-green-600/90;
}

.msg-box > .info {
  @apply bg-blue-600/90;
}

.msg-box > .warning {
  @apply bg-yellow-500/90;
}

.msg-box > .error {
  @apply bg-rose-600/90;
}

.flash-enter-active,
.flash-leave-active {
  @apply transition;
}

.flash-enter-from,
.flash-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
