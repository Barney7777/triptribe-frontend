import { UserData, useUserContext } from '@/contexts/UserContext';
import useRequest from '@/hooks/use-request';
import { FetchedUserData } from '@/types/user';

export const updateUserLoginStates = (data: FetchedUserData): UserData | null => {
  /**
   * logined -> update context and token
   * how to tell a user is logined: have access token
   * so when a user have a token, fetch data and update context and localstorage based on user type
   *
   * unlogined -> clean context and token
   * if there is no access token in localstorage: setUserContext({}) & clear userAccount localstorage
   */
  if (localStorage.getItem('accessToken')) {
    const avatarUrl = data?.userAvatar?.[0]?.imageUrl ?? 'undefined';
    localStorage.setItem('avatarUrl', avatarUrl);
    const newUserData = {
      email: data?.email,
      nickname: data?.nickname,
      role: data?.role,
    };
    return newUserData;
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('avatarUrl');
    return null;
  }
};
