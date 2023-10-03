// import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { request } from "./plugins/request.js";
import defineGlobals from "./plugins/defineGlobals.js";
import directives from "@/directives";

import App from "@/App.vue";

const app = createApp(App, { loadRouter: () => app.use(router) });
const pinia = createPinia();
app.use(pinia);

const { useSessionStore } = await import("./stores/session.js");
const { useFlashesStore } = await import("./stores/flashes.js");

const sessionStore = useSessionStore();
const flashesStore = useFlashesStore();

const globalPlugins = [
  { name: "request", value: request },
  { name: "session", value: sessionStore },
  { name: "flashes", value: flashesStore },
];
app.use(defineGlobals, globalPlugins);

app.provide("session", sessionStore);

directives.forEach((dir) => app.directive(dir.name, dir));

app.mount("#app");
