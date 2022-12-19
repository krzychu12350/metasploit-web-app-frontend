import http from "./http-common";
const METHOD_TYPE = "core";

class CoreService {
    addModule() {
        return http.post(METHOD_TYPE + "/add-Module");
    }
    moduleStats() {
        return http.post(METHOD_TYPE + "/module-Stats");
    }
    reloadModules() {
        return http.post(METHOD_TYPE + "/reload-Modules");
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
        return http.post(METHOD_TYPE + "/thread-List");
    }
    threadKill() {
        return http.post(METHOD_TYPE + "/thread-Kill");
    }
    stop() {
        return http.post(METHOD_TYPE + "/stop");
    }
}

export default new CoreService();