import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { handleResponseErrorMessage } from "./response";

const request: any = axios.create({
  timeout: 60000,
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      'Content-Type': 'application/json',
    }
    return config;
  },
  (error: ErrorCallback) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: ErrorCallback) => {
    return Promise.reject(handleResponseErrorMessage({ error }));
  }
);

export { request };
