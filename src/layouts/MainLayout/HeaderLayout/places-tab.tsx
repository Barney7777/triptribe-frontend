import { FC } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const PlacesTab: FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', width: 400 }}>
      <Button
        href={'/restaurants'}
        variant="text"
        color="primary"
      >
        <Typography
          variant="subtitle1"
          fontSize="1.5rem"
        >
          Restaurants
        </Typography>
      </Button>
      <Button
        href={'/attractions'}
        variant="text"
        color="primary"
      >
        <Typography
          variant="subtitle1"
          fontSize="1.5rem"
        >
          Attractions
        </Typography>
      </Button>
    </Box>
  );
};
