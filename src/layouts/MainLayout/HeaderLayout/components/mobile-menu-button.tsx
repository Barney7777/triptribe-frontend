import { Box, Button, Link, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
export const MobileMenuButton = ({ sx }: { sx?: SxProps }) => {
  const theme = useTheme();
  const responsiveStyle = {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  };
  return (
    <Button
      variant="text"
      sx={{ ...sx, ...responsiveStyle, marginRight: '4px' }}
    >
      <MenuIcon sx={{ height: '100%', width: 35 }} />
    </Button>
  );
};
