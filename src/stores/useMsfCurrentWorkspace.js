import { defineStore } from "pinia";

export const useMsfCurrentWorkspace = defineStore("currentWorkspace", {
  state: () => ({
    currentWorkspace: "",
  }),
  getters: {
    getCurrentRpcConnection() {
      return this.currentWorkspace;
    },
  },
  actions: {
    async setCurrentRpcConnection(workspaceName) {
      this.currentWorkspace = workspaceName;
    },
  },
  persist: {
    enabled: true
  },
});