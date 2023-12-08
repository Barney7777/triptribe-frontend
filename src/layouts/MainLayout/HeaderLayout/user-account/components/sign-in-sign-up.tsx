import { Box, Button } from '@mui/material';
import React from 'react';

export const SignInSignUp = () => {
  return (
    <Box
      gap={1.5}
      sx={{ display: 'flex', height: 36 }}
    >
      <Button
        href="/signin"
        variant="contained"
      >
        Signin
      </Button>
      <Button
        href="/signup"
        variant="contained"
      >
        Signup
      </Button>
    </Box>
  );
};
