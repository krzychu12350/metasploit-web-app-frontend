import http from "./http-common";
const METHOD_TYPE = "database";

class DatabaseDataService {
    getAllScannedHosts() {
        return http.post(METHOD_TYPE + "/hosts");
    }

}

export default new DatabaseDataService();