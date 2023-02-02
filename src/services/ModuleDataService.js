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
    nops() {
        return http.post(METHOD_TYPE + "/nops");
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
        return http.post(METHOD_TYPE + "/compatible-payloads");
    }
    targetCompatible() {
        return http.post(METHOD_TYPE + "/target-compatible");
    }
    compatibleSessions() {
        return http.post(METHOD_TYPE + "/compatible-sessions");
    }
    encode() {
        return http.post(METHOD_TYPE + "/encode");
    }
    execute() {
        return http.post(METHOD_TYPE + "/execute");
    } 
}

export default new ModuleService();