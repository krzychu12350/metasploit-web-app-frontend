import http from "./http-common";
const METHOD_TYPE = "module";

class ModuleService {
    async exploits()  {
        return http.post(METHOD_TYPE + "/exploits");
    }
    auxiliary() {
        return http.post(METHOD_TYPE + "/auxiliary");
    }
    post() {
        return http.post(METHOD_TYPE + "/post");
    }
    payloads() {
        return http.post(METHOD_TYPE + "/payloads");
    }
    encoders() {
        return http.post(METHOD_TYPE + "/encoders");
    }
    info(data ){
        return http.post(METHOD_TYPE + "/info", data);
    }
    options() {
        return http.post(METHOD_TYPE + "/options");
    }
    compatiblePayloads() {
        return http.post(METHOD_TYPE + "/compatiblePayloads");
    }
    targetCompatible() {
        return http.post(METHOD_TYPE + "/targetCompatible");
    }
    compatibleSessions() {
        return http.post(METHOD_TYPE + "/compatibleSessions");
    }
    encode() {
        return http.post(METHOD_TYPE + "/encode");
    }
    execute() {
        return http.post(METHOD_TYPE + "/execute");
    } 
}

export default new ModuleService();