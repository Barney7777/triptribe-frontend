import React, { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import Header from './Header';
import Footer from './Footer';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const sx = {
    // mx: 'auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: 'sm',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 'md',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'lg',
    },
  };
  return (
    <>
      <Header />
      <Container
        component="main"
        sx={sx}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};
