import React from 'react';
import { Container, Paper } from '@mui/material';
import BackLink from './BackLink';

interface AuthPageContainerProps {
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const AuthPageContainer = ({ maxWidth, children }: AuthPageContainerProps) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
  };

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        ...containerStyle,
      }}
    >
      <BackLink />
      <Paper
        elevation={16}
        sx={{ width: '420px', borderRadius: 5 }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default AuthPageContainer;
