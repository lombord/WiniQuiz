<template>
  <aside
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    class="side-root"
  >
    <div class="side-hover"></div>
    <Transition name="side">
      <div v-show="showT" class="sidebar">
        <div class="side-top">
          <SideTop v-model:show="show" />
          <div>
            <slot name="top"></slot>
          </div>
          <SideList :list="routes" />
        </div>
        <SideBottom />
      </div>
    </Transition>
  </aside>
</template>

<script>
import SideTop from "./SideTop.vue";
import SideList from "./SideList.vue";
import SideBottom from "./SideBottom.vue";
export default {
  data() {
    return {
      show: true,
      isHover: false,
      justHided: false,
    };
  },

  created() {
    this.show = JSON.parse(localStorage.getItem("showSidebar") || "true");
  },

  watch: {
    show(nVal) {
      localStorage.setItem("showSidebar", JSON.stringify(nVal));
      if (!nVal) this.isHover = false;
    },
  },

  computed: {
    showT() {
      return this.show || this.isHover;
    },
  },

  props: {
    routes: {
      type: Array,
      required: true,
    },
  },

  components: {
    SideList,
    SideTop,
    SideBottom,
  },
};
</script>

<style scoped>
.side-root {
  @apply overflow-auto;
  z-index: 50;
}

.side-hover {
  @apply fixed left-0 top-0 bottom-0 w-4;
}
.sidebar {
  @apply p-3 sm:px-4 md:p-5 transition-transform
  min-h-screen shadow-md border-r bg-white max-w-5xl
  sm:min-w-[23vw] z-10 relative
  flex flex-col justify-between gap-3;
}

.side-enter-active,
.side-leave-active {
  @apply transition delay-75;
}

.side-enter-from,
.side-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
