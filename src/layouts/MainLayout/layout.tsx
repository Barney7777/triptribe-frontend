import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';

import Header from './Header';
import Footer from './Footer';
import { borderBottom } from '@mui/system';
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          // padding: '16px',
          // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
          }}
        >
          <Box
            sx={{
              flex: 3,
              // padding: '16px',
              // boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            {children}
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export { Layout };
