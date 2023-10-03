import { defineStore } from "pinia";
import axios from "axios";
import { request } from "../plugins/request.js";

export const useSessionStore = defineStore("session", {
  state: () => ({
    access: "",
    refresh: "",
    user: undefined,
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.user;
    },
    isLoaded: (state) => {
      return state.user !== undefined;
    },
    token: (state) => state.access,
    tRequest(state) {
      const { defaults } = request;
      const conf = {
        headers: { Authorization: `Bearer ${state.access}` },
      };
      return axios.create({ ...defaults, ...conf });
    },
  },

  actions: {
    async animatePromise(promise, elm, cls = "load-anim") {
      elm = elm || document.body;
      elm.classList.add(cls);
      try {
        // just for a longer animation
        // await new Promise((r) => setTimeout(r, 2000));
        return await promise;
      } finally {
        elm.classList.remove(cls);
      }
    },

    async patchFields(...fields) {
      const data = Object.fromEntries(fields.map((k) => [k, this.user[k]]));
      const cfg = {
        url: "session/update/",
        method: "patch",
        data,
      };
      return await this.request(cfg);
    },

    async fetchToken(data) {
      const response = await request.post("token/", data);
      this.$patch(response.data);
    },

    async updateToken() {
      let response;
      const data = { refresh: this.refresh };
      try {
        response = await request.post("token/refresh/", data);
        this.$patch(response.data);
      } catch (err) {
        this.logout();
      }
    },

    async request(config) {
      if (!this.access) throw new Error("Access is not available");
      try {
        return await this.tRequest.request(config);
      } catch (err) {
        const code = err.response.data.code;
        console.log(code);
        if (code === "token_not_valid") {
          await this.updateToken();
          if (this.access) {
            return await this.request(config);
          }
        }
        if (code === "user_not_found") {
          return this.logout();
        }
        throw err;
      }
    },

    async fetchUser() {
      try {
        const response = await this.request({ url: "session/" });
        this.user = response.data;
      } catch (err) {
        this.user = null;
        throw err;
      }
    },

    async loadSession() {
      this.loadFromLocalStore();
      try {
        await this.fetchUser();
      } catch (err) {}
    },

    loadFromLocalStore() {
      this.refresh = localStorage.getItem("refresh") || "";
      this.access = localStorage.getItem("access") || "";
    },

    async login(data) {
      await this.fetchToken(data);
      await this.animatePromise(this.fetchUser());
    },

    logout() {
      this.$reset();
      localStorage.clear();
    },
  },
});

const sessionStore = useSessionStore();

sessionStore.$subscribe((mutation, state) => {
  if (!state) return;
  const { access, refresh } = state;
  access && localStorage.setItem("access", state.access);
  refresh && localStorage.setItem("refresh", state.refresh);
});
