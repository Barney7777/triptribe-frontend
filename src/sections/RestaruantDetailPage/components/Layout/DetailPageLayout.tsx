import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

const DetailPageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </>
  );
};
export default DetailPageLayout;
