import http from "./http-common";
const METHOD_TYPE = "console";

class ConsoleService {
    create() {
        return http.post(METHOD_TYPE + "create");
    }
    destroy() {
        return http.post(METHOD_TYPE + "/destroy");
    }
    list() {
        return http.post(METHOD_TYPE + "/list");
    }
    write() {
        return http.post(METHOD_TYPE + "/write");
    }
    read() {
        return http.post(METHOD_TYPE + "/read");
    }
    sessionDetach() {
        return http.post(METHOD_TYPE + "/sessionDetach");
    }
    sessionKill() {
        return http.post(METHOD_TYPE + "/sessionKill");
    }
}

export default new ConsoleService();
