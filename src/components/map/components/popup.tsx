import { Popup } from 'react-map-gl';
import React from 'react';
import { MapItemCard } from '@/components/map/components/MapItemCard';
import { useMapContext } from '@/contexts/map-context';

export const MapPopUp: React.FC = () => {
  const popupInfo = useMapContext((state) => state.popupInfo);
  const updatePopupInfo = useMapContext((state) => state.updatePopupInfo);
  const setPopupInfo = () => {
    updatePopupInfo(null);
  };
  if (popupInfo) {
    return (
      <Popup
        anchor="bottom"
        longitude={Number(popupInfo.address.location.lng)}
        latitude={Number(popupInfo.address.location.lat)}
        onClose={setPopupInfo}
        maxWidth="240px"
        offset={50}
      >
        <MapItemCard popupInfo={popupInfo} />
      </Popup>
    );
  }
};
