<template>
  <div>
    <Transition name="result">
      <Result v-if="isFinished" class="mb-3" :result="result" />
    </Transition>
    <div class="tflex quiz-head">
      <h4 class="text-blue-600">{{ current.index + 1 }} of {{ mode.count }}</h4>
      <Timer
        :timeout="mode.timeout * 60"
        :stopTimer="isFinished"
        @timeout="finish"
      />
    </div>

    <Question
      v-if="current"
      :question="current"
      :reveal="isFinished"
      :class="{ 'pe-none': isFinished }"
    />

    <div class="tflex mt-5">
      <button @click="previousQ" class="move-btn">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div class="flex-1 text-center">
        <button
          v-if="isFinished"
          @click="$emit('restart')"
          class="center-btn btn-yellow"
        >
          Go Back
        </button>
        <button v-else @click="finish" class="center-btn btn-green">
          Finish
        </button>
      </div>
      <button @click="nextQ" class="move-btn">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Question from "./Question.vue";
import Result from "./Result.vue";
import Timer from "./Timer.vue";

function range(start, stop, step = 1) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

function randRange(a, b) {
  if (b === undefined) {
    [a, b] = [0, a];
  }
  return Math.floor(Math.random() * (b - a) + a);
}

function randInt(a, b) {
  if (undefined in [a, b]) {
    throw new Error("You must provide both a and b");
  }
  return randRange(a, ++b);
}

export default {
  data: () => ({
    questions: null,
    current: null,
    isFinished: false,
    result: {
      correct: null,
      incorrect: null,
      score: null,
    },
  }),
  props: {
    mode: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.questions = this.genQuestions();
    this.current = this.questions[0];
    document.getRootNode().addEventListener("keydown", this.listerRoot);
  },

  beforeUnmount() {
    document.getRootNode().removeEventListener("keydown", this.listerRoot);
  },

  methods: {
    finish() {
      this.result = this.calcResult();
      this.isFinished = true;
      this.$emit("finish", this.result);
    },

    listerRoot(ev) {
      if (ev.key == "ArrowLeft") return this.previousQ();
      if (ev.key == "ArrowRight") return this.nextQ();
    },

    calcResult() {
      const correct = this.questions.reduce(
        (prev, { answer, choice }) => prev + (answer === choice),
        0
      );
      return {
        correct,
        incorrect: this.questions.length - correct,
        score: correct * this.mode.point,
      };
    },

    previousQ() {
      const { index } = this.current;
      if (index) {
        this.current = this.questions[index - 1];
      }
    },

    nextQ() {
      const { index } = this.current;
      if (index + 1 < this.questions.length) {
        this.current = this.questions[index + 1];
      }
    },

    genQuestions() {
      return Array.from({ length: this.mode.count }, this.genQuestion);
    },

    genQuestion(_, index) {
      const [answer, str] = this.randQuestion();
      return {
        index,
        answer,
        variants: this.getVariants(answer),
        str,
      };
    },

    randQuestion() {
      const coin = Math.random();
      for (let [key, props] of Object.entries(this.mode.ops)) {
        let a, b, range;
        if (Array.isArray(props)) {
          [a, b] = props;
          range = this.mode.range;
        } else {
          ({
            chance: [a, b],
            range,
          } = props);
        }
        if (a <= coin && coin < b) {
          const funcName = `${key.toLocaleLowerCase()}Gen`;
          return this[funcName](...range);
        }
      }
    },

    getVariants(answer) {
      const fakes = this.fakeVariants(answer);
      fakes.splice(randInt(0, 3), 0, answer);
      return fakes;
    },

    fakeVariants(answer) {
      const vars = range(answer - 3, answer + 3);
      vars.splice(3, 1);
      return vars.sort(() => 0.5 - Math.random()).slice(0, 3);
    },

    addGen(st, sp) {
      const a = randRange(st, sp);
      const b = randRange(0, sp - a);
      return [a + b, `${a} + ${b}`];
    },

    subGen(st, sp) {
      const [a, b] = [randRange(st, sp), randRange(st, sp)];
      return [a - b, `${a} - ${b}`];
    },

    mulGen(st, sp) {
      const [a, b] = [randRange(st, sp), randRange(st, sp)];
      return [a * b, `${a} * ${b}`];
    },

    divGen(st, sp) {
      const a = randRange(st, sp);
      const b = randRange(1, a / 2);
      return [Math.floor(a / b), `floor(${a} / ${b})`];
    },
  },

  components: {
    Question,
    Result,
    Timer,
  },
};
</script>

<style scoped>
@import "@/assets/base.css";
.quiz-head {
  @apply justify-between border border-b-0 py-2 px-4 
  rounded-t-md bg-zinc-100;
}

.result-enter-active,
.result-leave-active {
  transition: all 0.5s ease;
}

.result-enter-from,
.result-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.move-btn {
  @apply btn btn-blue px-6 py-1.5;
}

.center-btn {
  @apply btn  py-2 px-4;
}
</style>
