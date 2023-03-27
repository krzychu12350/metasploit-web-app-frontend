import axios from "axios";
import TokenDataService from "./TokenDataService";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-type": "application/json",
    }
});

const requestHandler = request => {
    return request;
};

const responseHandler = response => {
    if (response.status === 401 || response.data.message == "Invalid Authentication Token") {
        window.location = '/setup';
    }

    return response;
};

const wrongTokenResponseHandler = response => {
    if (response.data.message == "Invalid Authentication Token") {
        window.location = '/setup';
    }

    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

axiosInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );

 axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await TokenDataService.getMsfAccessToken();
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
