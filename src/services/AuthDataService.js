import http from "./http-common";
const METHOD_TYPE = "auth";

class AuthDataService {
    login(data) {
        return http.post(METHOD_TYPE + "/login", data);
    }
    logout(data) {
        return http.post(METHOD_TYPE + "/logout", data);
    }
    tokenAdd(data) {
        return http.post(METHOD_TYPE + "/token-add", data);
    }
    tokenGenerate() {
        return http.post(METHOD_TYPE + "/token-generate");
    }

    tokenList() {
        return http.post(METHOD_TYPE + "/token-list");
    }

    tokenRemove(data) {
        return http.post(METHOD_TYPE + "/token-remove", data);
    }
}

export default new AuthDataService();