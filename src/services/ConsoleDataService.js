import http from "./http-common";
const METHOD_TYPE = "console";

class ConsoleDataService {
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
        return http.post(METHOD_TYPE + "/session-detach");
    }
    sessionKill() {
        return http.post(METHOD_TYPE + "/session-kill");
    }
}

export default new ConsoleDataService();
