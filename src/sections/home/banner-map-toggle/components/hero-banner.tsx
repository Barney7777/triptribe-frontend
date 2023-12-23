import { NaviTopSearchBar } from '@/layouts/MainLayout/HeaderLayout/navi-top-search-bar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import NextLink from 'next/link';
import { Box } from '@mui/material';
import useRouterQuery from '@/hooks/use-router-query';
import { CircularLoading } from '@/components/CircularLoading';

export const HeroBanner: React.FC = () => {
  const { setUrlQuery } = useRouterQuery();
  const [mapLoading, setMapLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const toggleMapLoading = () => {
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
        position={'relative'}
      >
        <Box
          position={'absolute'}
          width={1}
          height={1}
          left={0}
          top={0}
          sx={{ opacity: shown ? 1 : 0, transition: '1s', overflow: 'hidden' }}
        >
          <img
            aria-label="Banner Image"
            src="https://drive.google.com/uc?export=view&id=13fBD9P9zs4ZO13Jm5kiusEfkYx8eezry"
            alt="Sydney Opera"
            object-fit="cover"
            onLoad={() => setShown(true)}
          />
        </Box>

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
              setUrlQuery({ map: 'shown' });
              toggleMapLoading();
            }}
            disabled={mapLoading}
          >
            Map View
          </Button>
          {mapLoading && <CircularLoading size={40} />}
        </Box>
      </Stack>
    </>
  );
};
