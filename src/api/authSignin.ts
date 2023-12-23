import axiosInstance from '../utils/request';

// type AuthSignInResponse = { accessToken: string; refreshToken: string };

export const authSignIn = async (email: string, password: string) => {
  console.log(email, password);
  return axiosInstance.request({
    method: 'post',
    url: '/auth/login',
    data: { email, password },
  });
};
