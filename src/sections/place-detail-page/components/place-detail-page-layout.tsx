import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

const PlaceDetailPageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 3,
      }}
    >
      {children}
    </Box>
  );
};
export default PlaceDetailPageLayout;
