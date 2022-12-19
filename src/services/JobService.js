import http from "./http-common";
const METHOD_TYPE = "job";

class JobService {
    list() {
        return http.post(METHOD_TYPE + "/list");
    }
    info() {
        return http.post(METHOD_TYPE + "/info");
    }
    stop() {
        return http.post(METHOD_TYPE + "/stop");
    }
}

export default new JobService();