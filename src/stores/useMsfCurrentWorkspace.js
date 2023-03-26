import { defineStore } from "pinia";

export const useMsfCurrentWorkspace = defineStore("currentWorkspace", {
  state: () => ({
    currentWorkspace: "",
  }),
  getters: {
    getCurrentWorkspace() {
      return this.currentWorkspace;
    },
  },
  actions: {
    async setCurrentWorkspace(workspaceName) {
      this.currentWorkspace = workspaceName;
    },
  },
  persist: {
    enabled: true
  },
});