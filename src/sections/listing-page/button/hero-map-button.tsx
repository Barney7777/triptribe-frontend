import { Button, Card, CardMedia } from '@mui/material';
import React from 'react';
// const path = '';
const image =
  'https://assets-global.website-files.com/609ed46055e27a02ffc0749b/63bc7e5e16e24a7c721cd994_mapbox_maps.jpeg';
const HeroMap = () => {
  return (
    <Card
      elevation={2}
      sx={{ borderRadius: 1, height: '100%', width: '100%' }}
    >
      <CardMedia
        // component={RouterLink}
        // href={path}
        image={image}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          textDecoration: 'none',
        }}
      >
        <Button variant="contained">Map View</Button>
      </CardMedia>
    </Card>
  );
};

export default HeroMap;
