import { defineStore } from "pinia";
import http from "../services/http-common";
import AuthDataService from "../services/AuthDataService";
import ToastService from "../services/ToastService";
import TokenDataService from "../services/TokenDataService";


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
    
    async login(credentials) {
      const response = await AuthDataService.login(credentials);
      console.log(response);
 
      if (response) {
        this.setMsfAccessToken(response.data.data.token);
        //alert(response.data.data.token);
        http.defaults.headers.common["Authorization"] = this.msfAccessToken;
        //console.log(http.defaults.headers.common["Authorization"]);
        //http.headers.Authorization = this.msfAccessToken;

        await TokenDataService.setMsfAccessToken(this.msfAccessToken);
        //alert(await TokenDataService.getMsfAccessToken());
        const ifPersistedToken = await AuthDataService.tokenAdd({ "newToken": this.msfAccessToken})
       // console.log(ifPersistedToken.data.data.result);
        if(ifPersistedToken.data.data.result === "success") {
          //console.log(ifPersistedToken.data.data.result);
        
          this.loggedIn = true;

         
        }
        ToastService.showToast("You have been connected successfully with Metasploit RPC")      
        /*
        const token = `Bearer ${response.authorization.access_token}`;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        const userData = await this.fetchUser();
        const company = (userData.companies[0] === undefined) ? 0 : userData.companies[0];
        const userDataForStoring = {
          user_id: userData.id,
          user_name: userData.name,
          user_surname: userData.surname,
          user_company_id: company.id,
          is_owner: userData.is_owner,
        };  
        await this.setUserData(userDataForStoring);
      
        */
      }
    },

    async logout() {
      const response = await AuthDataService.tokenRemove({
        "tokenToBeRemoved": await TokenDataService.getMsfAccessToken()
      });
      if (response) {
        this.setMsfAccessToken(null);
        TokenDataService.removeMsfAccessToken();
        //this.$reset();
      
        ToastService.showToast("You have been disconnected successfully")
        this.loggedIn = false;
      }
    },
  },
  persist: {
    enabled: true
  },
});