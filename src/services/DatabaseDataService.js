import http from "./http-common";
const METHOD_TYPE = "database";

class DatabaseDataService {
    getAllScannedHosts() {
        return http.post(METHOD_TYPE + "/hosts");
    }
    getHostServices(hostId) {
        return http.post(METHOD_TYPE + `/services/${hostId}`);
    }
    getHostDetails(hostId) {
        return http.post(METHOD_TYPE + `/hosts/${hostId}`);
    }
    getWorkspaces() {
        return http.post(METHOD_TYPE + "/workspaces");
    }

}

export default new DatabaseDataService();