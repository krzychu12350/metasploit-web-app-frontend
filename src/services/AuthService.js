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
        return http.post(METHOD_TYPE + "/token-Add");
    }
    tokenGenerate() {
        return http.post(METHOD_TYPE + "/token-Generate");
    }

    tokenList() {
        return http.post(METHOD_TYPE + "/token-List");
    }

    tokenRemove() {
        return http.post(METHOD_TYPE + "/token-Remove");
    }
}

export default new AuthService();