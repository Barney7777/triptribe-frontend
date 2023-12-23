import React, { ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import Header from './Header';
import Footer from './Footer';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const sx = {};
  return (
    <React.Fragment>
      <Header />
      <Container
        fixed
        component="main"
        sx={sx}
      >
        {children}
      </Container>
      <Footer />
    </React.Fragment>
  );
};
