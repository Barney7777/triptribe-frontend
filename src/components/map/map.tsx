import React, { ReactNode, useCallback, useEffect } from 'react';
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
import { Location } from '@/types/address';
import { useDebounce } from '@/hooks/use-debounce';
import { zoomToLimit, zoomToDistance } from './utils/distance-and-limit';
import { getLocation } from './utils/get-location';
import { useMapContext } from '@/contexts/map-context';
import axiosInstance from '@/utils/request';
import useSWR from 'swr';

type MapProps = {
  mapId: string;
  sx?: SxProps | SxProps<any>;

  // fetchData: HomepageMapFetchData;
  children?: ReactNode;
};
export const Map: React.FC<MapProps> = ({ sx, mapId, children }) => {
  const maxDistance = useMapContext((state) => state.maxDistance);
  const updateMaxDistance = useMapContext((state) => state.updateMaxDistance);
  const mapCenter = useMapContext((state) => state.mapCenter);
  const updateMapCenter = useMapContext((state) => state.updateMapCenter);
  const zoom = useMapContext((state) => state.zoom);
  const updateZoom = useMapContext((state) => state.updateZoom);
  const updatePinInfo = useMapContext((state) => state.updatePinInfo);
  const defaultLocation: Location = { lng: 0, lat: 0 }; //melbourne
  const [geoLocationData, setGeoLocationData] = useState<Location>(mapCenter || defaultLocation);
  const limit = zoomToLimit(zoom);

  const mapRef = useRef<MapRef | null>(null);

  const TOKEN = process.env.NEXT_PUBLIC_MAP_API_KEY;
  if (!TOKEN) {
    throw new Error('no valid map token');
  }
  const initialZoom = 11;
  console.log(TOKEN);
  const requestOptions = {
    url: 'http://localhost:8080/api/v1/search/globalSearch',
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: {
      keyword: '',
      limit: limit,
      maxDistance: maxDistance,
      location: mapCenter ?? defaultLocation,
    },
  };

  const { data, error, isLoading, mutate } = useSWR<PlacesData>(requestOptions, async () => {
    const response = await axiosInstance.request<PlacesData>(requestOptions);
    return response.data;
  });
  useEffect(() => {
    if (data) {
      console.log(data);
      updatePinInfo(data);
    }
  }, [data, updatePinInfo]);

  // get map center when drag end.
  // debounce for delay useSwr trigger .
  const setMapCenter = () => {
    if (mapRef.current?.getCenter()) {
      updateMapCenter(mapRef.current?.getCenter());
    }
  };
  const debounceCenter = useDebounce(setMapCenter, 700);
  // update distance and limit when drag end
  const setMaxDistance = (zoom: number) => {
    const maxDistance = zoomToDistance(zoom);
    updateMaxDistance(maxDistance);
  };
  const debounceDistance = useDebounce(setMaxDistance, 700);
  // handle above two debounce
  const onMapChange = (zoom: number) => {
    debounceCenter();
    debounceDistance(zoom);
  };
  // update max distance when map start
  useEffect(() => {
    const maxDistance = zoomToDistance(zoom);
    setMaxDistance(maxDistance);
  }, []);

  // ask for user geolocation
  useEffect(() => {
    const setLocation = async () => {
      setGeoLocationData(await getLocation(mapCenter || { lng: 0, lat: 0 }));
    };
    setLocation();
  }, [getLocation]);

  // no geolocation -> user allow geolocation -> move to geolocation
  useEffect(() => {
    updateMapCenter(geoLocationData);
    mapRef.current?.setCenter(geoLocationData);
  }, []);

  // geolocation control, cancel animation
  const moveMap = useCallback((location: Location) => {
    // updateMapCenter(location);
    mapRef.current?.flyTo({ center: location, duration: 0 });
  }, []);

  // sidebar map click to fly to pin center
  useEffect(() => {
    moveMap(mapCenter);
  }, [mapCenter]);

  // set zoom
  const handleZoom = (e: ViewStateChangeEvent<MapInstance>) => {
    updateZoom(e.viewState.zoom);
  };
  return (
    <Box
      sx={{ ...sx, position: 'relative' }}
      id={mapId}
      className="ReactMapGl"
      aria-label="Map Container"
    >
      <MapGL
        ref={mapRef}
        initialViewState={{
          longitude: mapCenter ? mapCenter.lng : geoLocationData.lng,
          latitude: mapCenter ? mapCenter.lat : geoLocationData.lat,
          zoom: zoom || initialZoom,
          bearing: 0,
          pitch: 0,
        }}
        pitchWithRotate={false}
        dragRotate={false}
        touchZoomRotate={false}
        minZoom={2.5}
        onZoomEnd={(e) => {
          handleZoom(e);
          onMapChange(zoom);
        }}
        onDragEnd={() => {
          onMapChange(zoom);
        }}
        mapStyle="mapbox://styles/triptribe/clp18ys6w00cb01pq0t4c029g"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl
          onGeolocate={() => moveMap(geoLocationData)}
          position="top-left"
        />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {children}
      </MapGL>
    </Box>
  );
};
