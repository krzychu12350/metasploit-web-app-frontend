import http from "./http-common";
const METHOD_TYPE = "core";

class CoreService {
    addModule() {
        return http.post(METHOD_TYPE + "/add-module");
    }
    moduleStats() {
        return http.post(METHOD_TYPE + "/module-stats");
    }
    reloadModules() {
        return http.post(METHOD_TYPE + "/reload-modules");
    }
    save() {
        return http.post(METHOD_TYPE + "/save");
    }
    setg() {
        return http.post(METHOD_TYPE + "/setg");
    }
    unsetg() {
        return http.post(METHOD_TYPE + "/unsetg");
    }
    threadList() {
        return http.post(METHOD_TYPE + "/thread-list");
    }
    threadKill() {
        return http.post(METHOD_TYPE + "/thread-kill");
    }
    stop() {
        return http.post(METHOD_TYPE + "/stop");
    }
    version() {
        return http.post(METHOD_TYPE + "/version");
    }
}

export default new CoreService();