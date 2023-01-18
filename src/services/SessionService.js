import http from "./http-common";
const METHOD_TYPE = "session";

class SessionService {
    list() {
        return http.post(METHOD_TYPE + "/list");
    }
    stop() {
        return http.post(METHOD_TYPE + "/stop");
    }
    shellRead() {
        return http.post(METHOD_TYPE + "/shell-read");
    }
    shellWrite() {
        return http.post(METHOD_TYPE + "/shell-write");
    }
    meterpreterWrite() {
        return http.post(METHOD_TYPE + "/meterpreter-write");
    }
    meterpreterRead() {
        return http.post(METHOD_TYPE + "/meterpreter-read");
    }
    meterpreterRun() {
        return http.post(METHOD_TYPE + "/meterpreter-run");
    }
    meterpreterScript() {
        return http.post(METHOD_TYPE + "/meterpreter-script");
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
    shellUpgrade() {
        return http.post(METHOD_TYPE + "/shell-upgrade");
    }
    ringClear() {
        return http.post(METHOD_TYPE + "/ring-clear");
    }
    ringLast() {
        return http.post(METHOD_TYPE + "/ring-last");
    }
    ringPut() {
        return http.post(METHOD_TYPE + "/ring-put");
    }
}

export default new SessionService();