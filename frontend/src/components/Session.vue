<template>
  <div class="root">
    <SideBar :routes="routes">
      <template #top>
        <div class="tflex justify-center mt-2">
          <ImageForm :url="user.photo" @selected="saveImg"></ImageForm>
          <h4 class="hidden sm:block text-blue-600">{{ user.username }}</h4>
        </div>
        <hr class="border mb-5 mt-4 rounded-md" />
      </template>
    </SideBar>
    <div class="view-content">
      <router-view v-slot="{ Component }">
        <Transition name="fade">
          <keep-alive include="quiz">
            <component :is="Component" />
          </keep-alive>
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/base/SideBar";
import ImageForm from "@/components/forms/ImageForm.vue";

export default {
  data() {
    return {
      routes: [
        { to: { name: "home" }, title: "Home", icon: "fa-solid fa-house" },
        {
          to: { name: "quiz" },
          title: "Quiz",
          icon: "fa-solid fa-puzzle-piece",
        },
        {
          to: { name: "leaders" },
          title: "Leaders",
          icon: "fa-solid fa-chart-simple",
        },
      ],
    };
  },
  methods: {
    async saveImg(img) {
      let data = new FormData();
      data.append("photo", img);
      const cfg = {
        method: "patch",
        url: "session/update/",
        headers: { "Content-Type": "multipart/form-data" },
        data,
      };
      try {
        ({ data } = await this.$session.request(cfg));
        this.$session.user.photo = data.photo;
        this.$flashes.alertInfo("Profile photo has been updated");
      } catch (err) {
        Object.values(err.response.data).forEach((d) =>
          this.$flashes.alertErrors(d)
        );
      }
    },
  },
  computed: {
    user() {
      return this.$session.user;
    },
  },
  components: { SideBar, ImageForm },
};
</script>

<style scoped>
.root {
  @apply flex overflow-hidden max-h-screen;
}

.view-content {
  @apply flex-1 overflow-auto min-h-screen;
}

.view-content > * {
  @apply min-h-full;
}
</style>
