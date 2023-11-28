import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { useState, useMemo, useRef } from 'react';
import MapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  MapRef,
} from 'react-map-gl';
import { ViewStateChangeEvent } from 'react-map-gl/dist/esm/types';
import Pin from './pin';
import { PlacesData } from '@/types/map';
import { CityProps } from '@/types/attractions-restaurants';
import { MapInstance } from 'react-map-gl/dist/esm/types';
import axiosInstance from '@/utils/request';
import { useDebounce } from '@/hooks/use-debounce';
import { pinIconColor, pinIconList } from './pinIconProps';
import { MapPopUp } from './popup';
import { Location } from '@/types/address';
const TOKEN =
  (process.env.NEXT_PUBLIC_MAP_BOX_API_KEY as string) ||
  'pk.eyJ1IjoidHJpcHRyaWJlIiwiYSI6ImNscDB0bm9sbzBibXgya21qczY4ZDhsZXUifQ.MYlQE4YsEt5Z-tnHxFE9NA';
interface MapProps {
  mapId: string;
  sx?: SxProps | SxProps<any>;
  mapStyle?: string;
  initZoom?: number;
  maxZoom?: number;
  minZoom?: number;
}
export const Map: React.FC<MapProps> = ({ sx, mapId }) => {
  const [popupInfo, setPopupInfo] = useState<CityProps | null>(null);
  const [pinInfo, setPinInfo] = useState<PlacesData>([]);
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);
  const defaultLocation: Location = { lat: -37.8136, lng: 144.9631 }; //melbourne
  const [geoLocationData, setGeoLocationData] = useState<Location>(defaultLocation);
  const [onImageComplete, setOnImageComplete] = useState(false);
  const mapRef = useRef<MapRef | null>(null);
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

  const pins = useMemo(() => {
    if (pinInfo.length == 0) {
      return;
    } else {
      return pinInfo.map((place: CityProps, index) => (
        <Marker
          color="green"
          key={`marker-${index}`}
          longitude={place.address.location.lng}
          latitude={place.address.location.lat}
          anchor="bottom"
          // fade in when click marker
          onClick={(e) => {
            // fetch image
            //
            if (e.target.getLngLat().lat !== markerLat && e.target.getLngLat().lng !== markerLng) {
              setMarkerLat(() => e.target.getLngLat().lat);
              setMarkerLng(() => e.target.getLngLat().lng);
              setOnImageComplete(false);
            }
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(place);
          }}
        >
          <Pin
            placeType={place.type}
            placeIcon={pinIconList[place.type]}
            placeColor={pinIconColor[place.type]}
          ></Pin>
        </Marker>
      ));
    }
  }, [pinInfo]);

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

        {pins}

        {popupInfo && (
          <MapPopUp
            popupInfo={popupInfo}
            setPopupInfo={setPopupInfo}
            onImageComplete={onImageComplete}
            setOnImageComplete={setOnImageComplete}
          />
        )}
      </MapGL>
    </Box>
  );
};
