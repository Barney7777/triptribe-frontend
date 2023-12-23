import axios, { AxiosInstance, AxiosRequestConfig, CanceledError } from 'axios';

const pendingMap = new Map();

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
  // console.log('removePendingKey PendingMap', pendingMap);
  if (pendingMap.has(pendingKey)) {
    // console.log('removePendingKey PendingMap then', pendingMap);
    const controller = pendingMap.get(pendingKey);
    controller.abort();
    pendingMap.delete(pendingKey);
  }
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    removePending(config);
    // console.log('afterRemovePendingKey', pendingMap);
    addPending(config);
    // console.log('afterAddingPendingKey', pendingMap);
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    removePending(response.config);
    // console.log('correct removing', pendingMap);
    return response;
  },
  (error) => {
    // console.log('responseError', error);
    if (error?.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    if (!(error instanceof CanceledError)) {
      removePending(error?.config);
    }
    // console.log('error removing', pendingMap);
    // TODO: handle other status
    return Promise.reject(error);
  }
);

export default axiosInstance;
