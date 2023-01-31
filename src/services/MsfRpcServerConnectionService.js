import http from "./http-common";
const METHOD_TYPE = "connections";

class MsfRpcServerConnectionService {
    getConnections() {
        return http.get(METHOD_TYPE + "");
    }
    getConnection() {
        return http.get(METHOD_TYPE + '/' + {$id});
    }
    createNewConnection(data) {
        return http.post(METHOD_TYPE + "", data);
    }
    updateExistingConnection(data) {
        return http.put(METHOD_TYPE + '/' + {$id}, data);
    }
    deleteExistingConnection() {
        return http.delete(METHOD_TYPE + '/' + {$id});
    }
    setConnection(data) {
        return http.post(METHOD_TYPE + "/set-connection", data);
    }
}

export default new MsfRpcServerConnectionService();