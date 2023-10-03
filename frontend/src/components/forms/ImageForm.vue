<template>
  <div @click="selectImg" class="root">
    <input
      ref="imgInput"
      @input="changed"
      accept=".png, .jpg, .jpeg, .gif"
      class="img-input"
      type="file"
    />
    <img :src="currUrl" class="img-view" />
    <div class="img-overlay">
      <i class="fa-solid fa-plus"></i>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    inputUrl: null,
  }),
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    selectImg() {
      const ev = new MouseEvent("click");
      this.$refs.imgInput.dispatchEvent(ev);
    },
    changed(e) {
      this.$emit("selected", e.target.files[0]);
    },
  },
  computed: {
    currUrl() {
      return this.inputUrl || this.url;
    },
  },
};
</script>

<style scoped>
.root {
  @apply relative rounded-xl overflow-hidden 
  cursor-pointer
  w-12 md:w-16
  border shadow;
}

.img-view {
  @apply w-full object-cover object-center block aspect-square;
}

.img-input {
  @apply hidden;
}

.img-overlay {
  @apply opacity-0 transition absolute 
  flex justify-center items-center
  text-white
  inset-0 bg-slate-800/20;
}

.root:is(:hover, :focus) > .img-overlay {
  @apply opacity-100;
}
</style>
