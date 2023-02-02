import http from "./http-common";
const METHOD_TYPE = "plugin";

class PluginService {
    load() {
        return http.post(METHOD_TYPE + "/load");
    }
    unload() {
        return http.post(METHOD_TYPE + "/unload");
    }
    loaded() {
        return http.post(METHOD_TYPE + "/loaded");
    }
}

export default new PluginService();