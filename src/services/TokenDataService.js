class TokenDataService {
    async getMsfAccessToken() {
        return localStorage.getItem("msf_access_token");
    }

    async setMsfAccessToken(msfAccessToken) {
        localStorage.setItem("msf_access_token", msfAccessToken);
    }

    async removeMsfAccessToken() {
        localStorage.removeItem("msf_access_token");
    }
}

export default new TokenDataService();
