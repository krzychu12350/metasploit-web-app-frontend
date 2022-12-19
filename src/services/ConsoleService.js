import http from "./http-common";
const METHOD_TYPE = "console";

class ConsoleService {
    create() {
        return http.post(METHOD_TYPE + "/create");
    }
    destroy(data) {
        return http.post(METHOD_TYPE + "/destroy", data);
    }
    list() {
        return http.post(METHOD_TYPE + "/list");
    }
    write(data) {
        return http.post(METHOD_TYPE + "/write", data);
    }
    read(data) {
        return http.post(METHOD_TYPE + "/read", data);
    }
    sessionDetach() {
        return http.post(METHOD_TYPE + "/sessionDetach");
    }
    sessionKill() {
        return http.post(METHOD_TYPE + "/sessionKill");
    }
}

export default new ConsoleService();
