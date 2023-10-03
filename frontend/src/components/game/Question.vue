<template>
  <div>
    <div class="quest-box">
      <h4 class="py-3">{{ question.str }} = ?</h4>
    </div>
    <h5
      v-if="reveal && choice === undefined"
      class="text-rose-600 text-center mb-3"
    >
      Not Answered!
    </h5>
    <div class="variants">
      <Variant
        v-for="(variant, i) in question.variants"
        :key="variant"
        :isAnswer="answer == variant"
        :variant="variant"
        :reveal="reveal"
        v-model:choice="choice"
      >
        {{ String.fromCharCode(65 + i) }}
        &#41;
        {{ variant }}
      </Variant>
    </div>
  </div>
</template>

<script>
import Variant from "./Variant.vue";
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
    reveal: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    choice: {
      get() {
        return this.question.choice;
      },
      set(val) {
        this.question.choice = val !== this.choice ? val : undefined;
      },
    },
    answer() {
      return this.question.answer;
    },
  },

  components: {
    Variant,
  },
};
</script>

<style scoped>
.quest-box {
  @apply py-4 sm:py-5 md:py-8 border text-blue-600 
  text-center mb-5 rounded-b-md;
}
.variants {
  @apply gap-3 grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
}
</style>
