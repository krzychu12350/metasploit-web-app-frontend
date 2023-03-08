import { defineStore } from "pinia";

export const useCurrentMsfRpcConnection = defineStore("currentRpcConnection", {
  state: () => ({
    currentRpcConnection: {},
  }),
  getters: {
    getCurrentRpcConnection() {
      return this.currentRpcConnection;
    },
  },
  actions: {
    setCurrentRpcConnection(connectionSettings) {
      this.currentRpcConnection = connectionSettings;
    },
    destroyCurrentRpcConnection() {
      this.currentRpcConnection = {};
    },
  },
  persist: {
    enabled: true
  },
});