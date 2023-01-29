import axios from "axios";
import { useMsfAuth } from "../stores/useMsfAuth";
import TokenDataService from "./TokenDataService";

const axiosInstance = axios.create({
 
    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-type": "application/json",
        //"Authorization": await TokenDataService.getMsfAccessToken()
        //"Authorization": msfAuthData.value.msfAccessToken
    }
});

const requestHandler = request => {
    // Token will be dynamic so we can use any app-specific way to always   
    // fetch the new token before making the call
    //request.headers.Authorization = '';  
  
    return request;
};


const responseHandler = response => {
    if (response.status === 401) {
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
/*
const msfAuthStore = useMsfAuth();
const { msfAuthData } = storeToRefs(msfAuthStore);
*/

export default axiosInstance;
