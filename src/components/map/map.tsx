import React, { RefObject } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/system';
import { useState, useMemo, useRef, useEffect } from 'react';
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  MapRef,
} from 'react-map-gl';
// import ControlPanel from './control-panel';
import Pin from './pin';
import CITIES from '@/fakeData.json';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Rating from '@mui/material/Rating';

import NextLink from 'next/link';
import Image from 'next/image';

// import fetchedData from xxxxx

const TOKEN =
  (process.env.NEXT_PUBLIC_MAP_BOX_API_KEY as string) ||
  'pk.eyJ1IjoiZWxpcGhhbnRvbSIsImEiOiJjbG9xcHQzOHkwaXp6MmluNTE2MDVpbGhnIn0.JyreEm_GonjK6dakmFpFFA';

interface MapProps {
  mapId: string;
  sx?: SxProps | SxProps<any>;
  mapStyle?: string;
  initZoom?: number;
  maxZoom?: number;
  minZoom?: number;
}

interface CityProps {
  city: string;
  population: string;
  image: string;
  state: string;
  latitude: number;
  longitude: number;
}

export const Map: React.FC<MapProps> = ({ sx, mapId }) => {
  const [popupInfo, setPopupInfo] = useState<CityProps | null>(null);
  const [fadeOff, setFadeOff] = useState(false);
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            if (e.target.getLngLat().lat !== markerLat && e.target.getLngLat().lng !== markerLng) {
              setMarkerLat(() => e.target.getLngLat().lat);
              setMarkerLng(() => e.target.getLngLat().lng);
              console.log('我在点击同一个的时候不该运行');
              setFadeOff(true);
            }
            // // If we let the click event propagates to the map, it will immediately close the popup
            // // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),

    [markerLat, markerLng]
  );
  console.log('loadingImage', popupInfo === null);
  return (
    <Box
      sx={{ height: 514, position: 'relative' }}
      id={mapId}
    >
      <MapGL
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => {
              setPopupInfo(null);
            }}
            maxWidth="240px"
            offset={20}
          >
            <Box sx={{}}>
              <Link href="http://localhost:3000/attractions/B2e4C4Ad-Fd61-1ccd-4FDf-8B91c5B4BDEA">
                <img
                  onLoad={() => {
                    setFadeOff(false);
                  }}
                  style={{ objectFit: 'cover' }}
                  height={148}
                  width="100%"
                  src={popupInfo.image}
                  className={` ${fadeOff ? 'alert-hidden' : 'alert-shown'}`}
                  alt={popupInfo.city}
                />
              </Link>

              <Box sx={{ height: '55%', p: 1 }}>
                <Grid container>
                  <Grid
                    item
                    xs={8}
                  >
                    <Typography variant="subtitle1">
                      {popupInfo.city}, {popupInfo.state}
                    </Typography>
                    <Rating
                      name="simple-controlled"
                      value={3}
                      readOnly
                    />
                    <Typography
                      sx={{
                        display: 'inline-block',
                        color: 'open' ? 'green' : 'red',
                        paddingRight: 1,
                      }}
                    >
                      Open
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: 'inline-block' }}
                    >
                      Closes 12am
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{ display: 'flex', justifyContent: 'space-between', height: 40 }}
                  >
                    <IconButton
                      LinkComponent={NextLink}
                      href="/write-review"
                    >
                      <RateReviewIcon sx={{ pt: 0.25 }} />
                    </IconButton>
                    {/* {isFavorite?} */}
                    <IconButton>
                      <BookmarkIcon sx={{ color: 'orange' }} />
                      <BookmarkBorderIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Popup>
        )}
      </MapGL>
      {/* <ControlPanel /> */}
    </Box>
  );
};
