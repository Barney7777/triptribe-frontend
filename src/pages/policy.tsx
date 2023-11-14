import React from 'react';
import Policy from '@/components/Policy';
import { Box } from '@mui/material';

export default function policy() {
  return (
    <Box
      sx={{
        padding: '100px 0',
        margin: '0 auto',
        maxWidth: '780px',
      }}
    >
      <Policy />
    </Box>
  );
}
