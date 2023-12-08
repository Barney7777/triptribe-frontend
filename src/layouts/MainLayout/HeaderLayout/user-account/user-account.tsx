import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AccountMenu } from './components/account-menu';
import React, { useEffect, useState } from 'react';
import { Avatar, Skeleton } from '@mui/material';
import { SignInSignUp } from './components/sign-in-sign-up';
import useRequest from '@/hooks/use-request';
import { FetchedUserData } from '@/types/user';
import { useUserContext } from '@/contexts/UserContext';
import { updateUserLoginStates } from '@/utils/update-user-login-states';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

export const UserAccount: React.FC = () => {
  const { userData, setUserData } = useUserContext();
  const [loginState, setLoginState] = useState<string | boolean | null>(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    data: loginData,
    isLoading: loginLoading,
    error: loginError,
  } = useRequest<FetchedUserData>({
    method: 'get',
    url: '/users/me',
  });
  if (loginData) {
    localStorage.setItem('cachedData', JSON.stringify(loginData));
  }
  const signOutHandler = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('avatarUrl');
    setUserData(null);
    router.push('/');
  };

  useEffect(() => {
    if (loginData) {
      const newUserContext = updateUserLoginStates(loginData);
      setUserData(newUserContext);
      setLoginState(localStorage.getItem('accessToken'));
    }
  }, [loginData, loginLoading, setUserData]);

  useEffect(() => {
    if (!loginLoading) {
      setLoginState(localStorage.getItem('accessToken'));
    }
  }, [userData, loginLoading]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loginLoading]);
  return (
    <Box
      sx={{
        height: 40,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
      }}
    >
      {loading ? (
        <Skeleton
          variant="circular"
          sx={{ marginRight: 0.75 }}
        >
          <Avatar />
        </Skeleton>
      ) : loginState ? (
        <AccountMenu
          signOutHandler={signOutHandler}
          isLoading={loginLoading}
        />
      ) : (
        <SignInSignUp />
      )}
    </Box>
  );
};
