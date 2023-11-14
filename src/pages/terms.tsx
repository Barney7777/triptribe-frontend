import React from 'react';
import Terms from '@/components/Terms';
import { Box } from '@mui/material';

export default function terms() {
  return (
    <Box
      sx={{
        padding: '100px 0',
        margin: '0 auto',
        maxWidth: '780px',
      }}
    >
      <Terms />
    </Box>
  );
}
