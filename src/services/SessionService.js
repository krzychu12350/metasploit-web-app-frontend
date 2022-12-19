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
        return http.post(METHOD_TYPE + "/shell-Read");
    }
    shellWrite() {
        return http.post(METHOD_TYPE + "/shell-Write");
    }
    meterpreterWrite() {
        return http.post(METHOD_TYPE + "/meterpreter-Write");
    }
    meterpreterRead() {
        return http.post(METHOD_TYPE + "/meterpreter-Read");
    }
    meterpreterRun() {
        return http.post(METHOD_TYPE + "/meterpreter-Run");
    }
    meterpreterScript() {
        return http.post(METHOD_TYPE + "/meterpreter-Script");
    }
    meterpreterSession() {
        return http.post(METHOD_TYPE + "/meterpreter-Session");
    }
    meterpreterTabs() {
        return http.post(METHOD_TYPE + "/meterpreter-Tabs");
    }
    compatibleModules() {
        return http.post(METHOD_TYPE + "/compatible-Modules");
    }
    shellUpgrade() {
        return http.post(METHOD_TYPE + "/shell-Upgrade");
    }
    ringClear() {
        return http.post(METHOD_TYPE + "/ring-Clear");
    }
    ringLast() {
        return http.post(METHOD_TYPE + "/ring-Last");
    }
    ringPut() {
        return http.post(METHOD_TYPE + "/ring-Put");
    }
}

export default new SessionService();