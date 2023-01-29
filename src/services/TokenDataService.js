class TokenDataService {
    /*
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.access_token;
    }

    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.access_token = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
    */
    async getMsfAccessToken() {
        const msfAccessToken = localStorage.getItem("msf_access_token");
        return msfAccessToken;
    }

    async setMsfAccessToken(msfAccessToken) {
        localStorage.setItem("msf_access_token", msfAccessToken);
    }

    async removeMsfAccessToken() {
        localStorage.removeItem("msf_access_token");
    }
}

export default new TokenDataService();
