import React from 'react';
import { Map } from '../map';

import { MapPopUp } from '@/components/map/components/popup';
import { MapPins } from '@/components/map/components/MapPins';
import { useMapStore } from '@/stores/map-store';
export const MapWithPopup = () => {
  const popupInfo = useMapStore((state) => state.popupInfo);

  return (
    <Map
      sx={{ height: 600 }}
      mapId="bannerMap"
    >
      <>
        <MapPins />
        {popupInfo && <MapPopUp />}
      </>
    </Map>
  );
};
