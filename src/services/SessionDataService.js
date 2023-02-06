import http from "./http-common";
const METHOD_TYPE = "session";

class SessionService {
    list() {
        return http.post(METHOD_TYPE + "/list");
    }
    stop(data) {
        return http.post(METHOD_TYPE + "/stop", data);
    }
    shellRead(data) {
        return http.post(METHOD_TYPE + "/shell-read", data);
    }
    shellWrite(data) {
        return http.post(METHOD_TYPE + "/shell-write", data);
    }
    meterpreterWrite(data) {
        return http.post(METHOD_TYPE + "/meterpreter-write", data);
    }
    meterpreterRead(data) {
        return http.post(METHOD_TYPE + "/meterpreter-read", data);
    }
    meterpreterRun() {
        return http.post(METHOD_TYPE + "/meterpreter-run", data);
    }
    meterpreterScript(data) {
        return http.post(METHOD_TYPE + "/meterpreter-script", data);
    }
    meterpreterSession() {
        return http.post(METHOD_TYPE + "/meterpreter-session");
    }
    meterpreterTabs() {
        return http.post(METHOD_TYPE + "/meterpreter-tabs");
    }
    compatibleModules() {
        return http.post(METHOD_TYPE + "/compatible-modules");
    }
    shellUpgrade(data) {
        return http.post(METHOD_TYPE + "/shell-upgrade", data);
    }
    ringClear(data) {
        return http.post(METHOD_TYPE + "/ring-clear", data);
    }
    ringLast(data) {
        return http.post(METHOD_TYPE + "/ring-last", data);
    }
    ringPut(data) {
        return http.post(METHOD_TYPE + "/ring-put", data);
    }
}

export default new SessionService();