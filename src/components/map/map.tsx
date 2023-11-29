import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { useState, useRef } from 'react';
import MapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  MapRef,
} from 'react-map-gl';
import { ViewStateChangeEvent, MapInstance } from 'react-map-gl/dist/esm/types';

import { PlacesData } from '@/types/map';
import { CityProps } from '@/types/attractions-restaurants';
import { Location } from '@/types/address';
import axiosInstance from '@/utils/request';
import { useDebounce } from '@/hooks/use-debounce';
import { MapPopUp } from '@/components/map/components/popup';
import { MapPins } from '@/components/map/components/MapPins';
const TOKEN =
  (process.env.NEXT_PUBLIC_MAP_BOX_API_KEY as string) ||
  'pk.eyJ1IjoidHJpcHRyaWJlIiwiYSI6ImNscDB0bm9sbzBibXgya21qczY4ZDhsZXUifQ.MYlQE4YsEt5Z-tnHxFE9NA';
type MapProps = {
  mapId: string;
  sx?: SxProps | SxProps<any>;
  mapStyle?: string;
  initZoom?: number;
  maxZoom?: number;
  minZoom?: number;
};
export const Map: React.FC<MapProps> = ({ sx, mapId }) => {
  const [popupInfo, setPopupInfo] = useState<CityProps | null>(null);
  const [pinInfo, setPinInfo] = useState<PlacesData>([]);
  const defaultLocation: Location = { lat: -37.8136, lng: 144.9631 }; //melbourne
  const [geoLocationData, setGeoLocationData] = useState<Location>(defaultLocation);
  const [imageComplete, setImageComplete] = useState(false);
  const mapRef = useRef<MapRef | null>(null);
  const imageCompleteHandler = (state: boolean) => {
    setImageComplete(state);
  };
  const popupInfoHandler = (data: CityProps | null) => {
    setPopupInfo(data);
  };
  const fetchData = (e: ViewStateChangeEvent<MapInstance>) => {
    const center = mapRef.current?.getCenter();
    // console.log(center);
    let maxDistance;
    let topRatingQuantity;
    /**
     * zoom:11 distance:30000 = 3000*10
     * zoom:12 distance:15000 = 1000*15
     * zoom:13 distance:10000 = 1000*10
     * zoom:14 distance:4500
     * zoom:15 distance:2000
     * zoom:16 distance:1000
     * zoom:17 distance:700
     */
    if (e.viewState.zoom < 14) {
      // return;
      maxDistance = 40000000;
      topRatingQuantity = 999;
    } else if (e.viewState.zoom < 15) {
      maxDistance = 20000000;
      topRatingQuantity = 5;
    } else {
      topRatingQuantity = 15;
      maxDistance = 10000000;
    }

    // console.log(e.viewState.zoom);
    axiosInstance
      .request<PlacesData>({
        url: '/search/globalSearch',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          keyword: '',
          limit: topRatingQuantity,
          maxDistance: maxDistance,
          location: center,
        },
      })
      .then((res) => {
        // console.log(res);
        setPinInfo(res.data);
      })
      .catch((e) => {
        console.log('wrong', e);
      });
  };
  const fetchMapData = useDebounce(fetchData, 1000);

  useEffect(() => {
    mapRef.current?.setCenter(geoLocationData);
  }, [geoLocationData]);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocationData({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          setGeoLocationData({ lat: defaultLocation.lat, lng: defaultLocation.lng });
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log('no navigator.geolocation');
    }
    // find state from url
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  const handleGeolocate = () => {
    /**
     * if(distance < xxx){ return }
     */
    mapRef.current!.flyTo({ center: geoLocationData, duration: 0 });
  };

  // console.log(geoLocationData);

  return (
    <Box
      sx={{ height: 514, position: 'relative' }}
      id={mapId}
      aria-label="Map Container"
    >
      <MapGL
        ref={mapRef}
        initialViewState={{
          latitude: geoLocationData ? geoLocationData.lat : 40,
          longitude: geoLocationData ? geoLocationData.lng : -100,
          zoom: 11,
          bearing: 0,
          pitch: 0,
        }}
        pitchWithRotate={false}
        dragRotate={false}
        touchZoomRotate={false}
        minZoom={2.5}
        onZoomEnd={fetchMapData}
        onDragEnd={fetchMapData}
        // onClick={}
        mapStyle="mapbox://styles/triptribe/clp18ys6w00cb01pq0t4c029g"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl
          onGeolocate={handleGeolocate}
          position="top-left"
        />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        <MapPins
          pinInfo={pinInfo}
          imageCompleteHandler={imageCompleteHandler}
          setPopupInfo={popupInfoHandler}
        />

        {popupInfo && (
          <MapPopUp
            popupInfo={popupInfo}
            setPopupInfo={popupInfoHandler}
            imageCompleteHandler={imageCompleteHandler}
            imageComplete={imageComplete}
          />
        )}
      </MapGL>
    </Box>
  );
};
