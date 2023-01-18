import http from "./http-common";
const METHOD_TYPE = "auth";

class AuthService {
    login() {
        return http.post(METHOD_TYPE + "/login");
    }
    logout() {
        return http.post(METHOD_TYPE + "/logout");
    }
    tokenAdd() {
        return http.post(METHOD_TYPE + "/token-add");
    }
    tokenGenerate() {
        return http.post(METHOD_TYPE + "/token-generate");
    }

    tokenList() {
        return http.post(METHOD_TYPE + "/token-list");
    }

    tokenRemove() {
        return http.post(METHOD_TYPE + "/token-remove");
    }
}

export default new AuthService();