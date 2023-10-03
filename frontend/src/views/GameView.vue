<template>
  <CenterBox v-if="!currentMode">
    <GameMenu :modes="modes" v-model="currentMode" />
  </CenterBox>
  <CenterBox v-else class="quiz">
    <Quiz :mode="currentMode" @restart="restartGame" @finish="finished" />
  </CenterBox>
</template>

<script>
import CenterBox from "@/components/UI/CenterBox.vue";
import GameMenu from "@/components/game/GameMenu.vue";
import Quiz from "@/components/game/Quiz.vue";
export default {
  name: "quiz",
  data: () => ({
    modes: {
      easy: {
        count: 10,
        timeout: 8,
        point: 50,
        range: [50, 1e2],
        ops: {
          add: [0.5, 1],
          sub: [0.2, 0.5],
          mul: {
            chance: [0, 0.2],
            range: [2, 20],
          },
        },
        class: "btn-blue",
      },
      medium: {
        count: 15,
        timeout: 12,
        point: 100,
        range: [1e2, 1e3],
        ops: {
          add: [0.8, 1],
          sub: [0.5, 0.8],
          mul: {
            chance: [0.2, 0.5],
            range: [50, 150],
          },
          div: [0, 0.2],
        },
        class: "btn-yellow",
      },
      hard: {
        count: 30,
        timeout: 8,
        point: 200,
        range: [1e3, 1e4],
        ops: {
          add: [0.9, 1],
          sub: [0.8, 0.9],
          mul: [0.5, 0.8],
          div: [0, 0.5],
        },
        class: "btn-red",
      },
    },
    currentMode: null,
  }),
  components: { CenterBox, GameMenu, Quiz },
  methods: {
    restartGame() {
      this.currentMode = null;
    },
    async finished(result) {
      const user = this.$session.user;
      Object.entries(result).forEach(([k, v]) => (user[k] += v));
      await this.$session.patchFields(...Object.keys(result));
      this.$flashes.alertInfo(`You have got ${result.score} points`);
    },
  },
};
</script>

<style>
.quiz .center-box-slot {
  @apply max-w-3xl;
}
</style>
