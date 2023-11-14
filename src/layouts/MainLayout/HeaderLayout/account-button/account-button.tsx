import type { FC } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AccountMenu } from './account-menu';

interface AccountButtonProps {
  loginStatus: boolean;
  simulateLogin: () => void;
}

export const AccountButton: FC<AccountButtonProps> = ({ loginStatus, simulateLogin }) => {
  // set state for search bar for show and disappear

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
      {loginStatus ? (
        <Box
          gap={1.5}
          sx={{ display: 'flex', height: 36 }}
        >
          <Button
            href="/signin"
            variant="contained"
            onClick={simulateLogin}
          >
            Signin
          </Button>
          <Button
            href="/signup"
            variant="contained"
            onClick={simulateLogin}
          >
            Signup
          </Button>
        </Box>
      ) : (
        <AccountMenu simulateLogin={simulateLogin} />
      )}
    </Box>
  );
};
