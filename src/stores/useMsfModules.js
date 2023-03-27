import { defineStore } from "pinia";
import ModuleDataService from "../services/ModuleDataService";

export const useMsfModules = defineStore("modules", {
  state: () => ({
    modules: [],
    payloads: [],
  }),
  getters: {
    getMsfModules() {
      return this.modules;
    },
    getMsfPayloads() {
      return this.payloads;
    },
  },
  actions: {
    clearAllMsfModules() {
      this.modules = [];
      this.payloads = [];
    },
    async fetchAllModules() {
      const exploits = await this.getAllExploits();
      const payloads = await this.getAllPayloads();
      const auxiliaries = await this.getAllAuxiliaries();
      const posts = await this.getAllPosts();
      this.payloads = payloads;
      this.modules = this.modules.concat(exploits, payloads, auxiliaries, posts);
    },
    async getAllPayloads() {
      return ModuleDataService.payloads()
        .then((res) => {
          const response = res.data.data.modules;
          response.forEach(function (payload, index) {
            response[index] = { module_name: payload, module_type: "payload" };
          });

          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    async getAllExploits() {
      return ModuleDataService.exploits()
        .then((res) => {
          const response = res.data.data.modules;
          response.forEach(function (exploit, index) {
            response[index] = { module_name: exploit, module_type: "exploit" };
          });
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    async getAllAuxiliaries() {
      return ModuleDataService.auxiliary()
        .then((res) => {
          const response = res.data.data.modules;
          response.forEach(function (exploit, index) {
            response[index] = { module_name: exploit, module_type: "auxiliary" };
          });
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    async getAllPosts() {
      return ModuleDataService.post()
        .then((res) => {
          const response = res.data.data.modules;
          response.forEach(function (exploit, index) {
            response[index] = { module_name: exploit, module_type: "post" };
          });
          console.log(response);
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  persist: {
    enabled: true
  },
});