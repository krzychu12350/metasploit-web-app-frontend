import http from "./http-common";
const METHOD_TYPE = "database";

class DatabaseDataService {
    getAllScannedHosts(workspaceId) {
        return http.get(METHOD_TYPE + `/workspaces/${workspaceId}/hosts`);
    }
    getHostServices(hostId) {
        return http.get(METHOD_TYPE + `/services/${hostId}`);
    }
    getHostDetails(hostId) {
        return http.get(METHOD_TYPE + `/hosts/${hostId}`);
    }
    getWorkspaces() {
        return http.get(METHOD_TYPE + "/workspaces");
    }

}

export default new DatabaseDataService();