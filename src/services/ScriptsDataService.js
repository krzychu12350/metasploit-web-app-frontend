import http from "./http-common";
const METHOD_TYPE = "scripts";

class ScriptsDataService {
    getAllMsfScripts() {
        return http.get(METHOD_TYPE);
    }
    getSingleScript(id) {
        return http.get(METHOD_TYPE + `/${id}`);
    }
    createNewScript(data) {
        return http.post(METHOD_TYPE, data);
    }
    updateScript(id, data) {
        return http.put(METHOD_TYPE + `/${id}`, data);
    }
    deleteScript(id) {
        return http.delete(METHOD_TYPE + `/${id}`);
    }
}

export default new ScriptsDataService();