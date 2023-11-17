import { NaviTopSearchBar } from '@/layouts/MainLayout/HeaderLayout/navi-top-search-bar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import NextLink from 'next/link';
import { Box } from '@mui/material';

interface HeroBannerProps {
  mapToggleHandler: (queryObj: Record<string, any>) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ mapToggleHandler }) => {
  const [mapLoading, setMapLoading] = useState(false);
  const toggleMapLoadingHandler = () => {
    setMapLoading(true);
  };

  return (
    <>
      <Stack
        pt={12}
        direction={'column'}
        spacing={8}
        // maxWidth="lg"
        height={450}
        // marginX={'auto'}
        my={4}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          backgroundImage:
            'url("https://drive.google.com/uc?export=view&id=13fBD9P9zs4ZO13Jm5kiusEfkYx8eezry")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <NaviTopSearchBar
          id="heroBannerSearchBar"
          sx={{
            width: '70%',
            bgcolor: 'white',
            borderRadius: 1,
            zIndex: '2',
            overflow: 'hidden',
          }}
          text={'Search'}
        />
        <Box
          bgcolor={'white'}
          borderRadius={1.5}
          position={'relative'}
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{
              width: 169,
              height: 55,
              borderRadius: 1.5,
              // ':hover': { color: 'secondary.dark' },
            }}
            LinkComponent={NextLink}
            // href="?map=shown"
            onClick={() => {
              mapToggleHandler({ map: 'shown' });
              toggleMapLoadingHandler();
            }}
            disabled={mapLoading}
          >
            Map View
          </Button>
          {mapLoading && (
            <CircularProgress
              size={40}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-20px',
                marginLeft: '-20px',
              }}
            />
          )}
        </Box>
      </Stack>
    </>
  );
};
