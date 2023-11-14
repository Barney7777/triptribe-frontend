import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { Map } from '@/components/map';
import { HeroBanner } from './components';
interface Location {
  lat: number;
  lng: number;
}

export const BannerMapToggle: React.FC = () => {
  const defaultLocation: Location = { lat: -77.034084142948, lng: 38.909671288923 }; //melbourne
  const mapToggleHandler: () => void = () => {
    getLocation();
  };
  const [isMap, setIsMap] = useState<boolean>(false);
  const [geoLocationData, setGeoLocationData] = useState<Location>(defaultLocation);
  // get user's location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocationData({ lat: position.coords.latitude, lng: position.coords.longitude });
          setIsMap(!isMap);
        },
        () => {
          setGeoLocationData(defaultLocation);
          setIsMap(!isMap);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log('no navigator.geolocation');
    }
  }
  return (
    <>
      {isMap ? (
        <Box sx={{}}>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              LinkComponent={NextLink}
              onClick={mapToggleHandler}
              sx={{
                position: 'absolute',
                width: 40,
                height: 40,
                top: 10,
                right: 10,
                borderRadius: '50%',
                zIndex: 999,
                bgcolor: 'white',
                '&:hover': {
                  bgcolor: 'white',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            <Map
              sx={{ height: 600 }}
              mapId={'bannerMap'}
            />
          </Box>
        </Box>
      ) : (
        <HeroBanner mapToggleHandler={mapToggleHandler} />
      )}
    </>
  );
};
