import axiosInstance from '../utils/request';

export const authRegister = async (email: string, password: string) =>
  axiosInstance.request({ method: 'post', url: '/auth/register', data: { email, password } });
