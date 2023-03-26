import { defineStore } from "pinia";

export const useCurrentConsole = defineStore("currentConsoleId", {
  state: () => ({
    currentConsoleId: Number,
  }),
  getters: {
    getCurrentConsoleId() {
      return this.currentConsoleId;
    },
  },
  actions: {
    setCurrentConsoleId(consoleId) {
      this.currentConsoleId = consoleId;
    },
  },
  persist: {
    enabled: true
  },
});