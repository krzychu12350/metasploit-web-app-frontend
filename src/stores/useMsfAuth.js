import { defineStore } from "pinia";
import http from "../services/http-common";
import AuthDataService from "../services/AuthDataService";
import ToastService from "../services/ToastService";
import TokenDataService from "../services/TokenDataService";
import MsfRpcServerConnectionService from "../services/MsfRpcServerConnectionService";

export const useMsfAuth = defineStore("auth", {
  state: () => ({
    msfAccessToken: null,
    loggedIn: TokenDataService.getMsfAccessToken() ? true : false,
  }),
  getters: {
    getMsfAccessToken(state) {
      return state.msfAccessToken;
    },
  },
  actions: {
    async setMsfAccessToken(msfAccessToken) {
      this.msfAccessToken = msfAccessToken;
    },
    async setConnection(connectionSettings) {
    console.log('setting conn');
     return MsfRpcServerConnectionService.setConnection(connectionSettings)
     .then((res)=> {
      return res.data.connection_details;
     })
     .catch((err)=> {
      console.log(err.response.data);
    });
    },
    async login(credentials) {
      const response = await AuthDataService.login(credentials);
      if (response) {
        this.setMsfAccessToken(response.data.data.token);
        http.defaults.headers.common["Authorization"] = this.msfAccessToken;
        await TokenDataService.setMsfAccessToken(this.msfAccessToken);
        const ifPersistedToken = await AuthDataService.tokenAdd({ "new_token": this.msfAccessToken})
        if(ifPersistedToken.data.data.result === "success") {
          this.loggedIn = true;
        }
        ToastService.showToast("You have been connected successfully with Metasploit RPC Server");
      }
    },

    async logout() {
      const response = await AuthDataService.tokenRemove({
        "token_to_be_removed": await TokenDataService.getMsfAccessToken()
      });
      if (response) {
        this.setMsfAccessToken(null);
        TokenDataService.removeMsfAccessToken();
        ToastService.showToast("You have been disconnected successfully")
        this.loggedIn = false;
      }
    },
  },
  persist: {
    enabled: true
  },
});