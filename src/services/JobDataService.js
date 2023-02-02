import http from "./http-common";
const METHOD_TYPE = "job";

class JobService {
    list() {
        return http.post(METHOD_TYPE + "/list");
    }
    info(data) {
        return http.post(METHOD_TYPE + "/info", data);
    }
    stop(data) {
        return http.post(METHOD_TYPE + "/stop", data);
    }
}

export default new JobService();