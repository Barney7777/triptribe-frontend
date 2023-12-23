import Box from '@mui/material/Box';
import { AccountMenu } from './components/account-menu';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Skeleton } from '@mui/material';
import { SignInSignUp } from './components/sign-in-sign-up';
import { UserContext } from '@/contexts/user-context/user-context';

export const UserAccount: React.FC = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
        opacity: loading ? 0 : 1,
        transition: '0.5s',
        overflow: 'hidden',
      }}
    >
      {loading ? (
        <Skeleton
          variant="circular"
          sx={{ marginRight: 0.75 }}
        >
          <Avatar />
        </Skeleton>
      ) : isAuthenticated ? (
        <AccountMenu />
      ) : (
        <SignInSignUp />
      )}
    </Box>
  );
};
