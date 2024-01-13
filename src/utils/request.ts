import axios, { AxiosInstance, AxiosRequestConfig, CanceledError } from 'axios';
import * as Sentry from '@sentry/nextjs';
const pendingMap = new Map();

const getPendingKey = (config: AxiosRequestConfig) => {
  let { url, method, params, data } = config;
  if (typeof data === 'string') data = JSON.parse(data);
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
};

const addPending = (config: AxiosRequestConfig) => {
  const pendingKey = getPendingKey(config);
  if (!config.controller) {
    const controller = new AbortController();
    config.controller = controller;
  }
  config.signal = config.controller.signal;
  pendingMap.set(pendingKey, config.controller);
};

const removePending = (config: AxiosRequestConfig) => {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const controller = pendingMap.get(pendingKey);
    controller.abort();
    pendingMap.delete(pendingKey);
  }
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // removePending(config);
    // addPending(config);
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Sentry.captureException(error);
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // removePending(response.config);
    return response;
  },
  (error) => {
    Sentry.captureException(error);

    // not throwing CanceledError cased by duplicated request
    if (error instanceof CanceledError) {
      return;
    }

    // removePending(error?.config);

    if (error?.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    // TODO: handle other status
    return Promise.reject(error);
  }
);

export default axiosInstance;
