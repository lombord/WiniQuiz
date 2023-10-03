import { defineStore } from "pinia";

export const useFlashesStore = defineStore("flashes", {
  state: () => ({
    messages: [],
    _id: 1,
    timeout: 4000,
  }),
  getters: {},
  actions: {
    alertMessage(message, code, timeout) {
      timeout = timeout || this.timeout;
      const id = this._id++;
      this.messages.push({ id: id, message, code });
      setTimeout(() => this.removeFlash(id), timeout);
      return id;
    },

    alertSuccess(message) {
      return this.alertMessage(message, "success");
    },

    alertInfo(message) {
      return this.alertMessage(message, "info");
    },

    alertWarning(message) {
      return this.alertMessage(message, "warning");
    },

    alertError(message) {
      return this.alertMessage(message, "error");
    },

    alertMessages(messages, code, timeout) {
      messages.forEach(([message, cd]) =>
        this.alertMessage(message, cd || code, timeout)
      );
    },

    alertErrors(messages) {
      messages.forEach((msg) => this.alertError(msg));
    },

    removeFlash(id) {
      this.messages.length <= 1 || (this._id = 1);
      if (!this.messages.length) return;
      this.messages.splice(
        this.messages.findIndex((flash) => flash.id == id),
        1
      );
    },
  },
});
