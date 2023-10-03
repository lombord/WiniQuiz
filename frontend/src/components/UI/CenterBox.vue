<template>
  <div class="screen-center">
    <div class="container">
      <div class="center-box-slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  @apply p-3;
}

.center-box-slot {
  @apply px-4 sm:px-7 md:px-10 py-5 sm:py-10 md:py-14 rounded-md bg-white
   border drop-shadow-xl max-w-[500px] mx-auto;
}
</style>
