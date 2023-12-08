import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASIC_URL || 'https://mock.apifox.com/m1/3534088-0-default',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && !['/auth/signup', '/auth/signin'].includes(config.url as string)) {
      config.headers.Authorization = 'Bearer ' + token + '';
    }
    console.log('request config', config);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
    }
    // TODO: handle other status
    return Promise.reject(error);
  }
);

export default axiosInstance;
