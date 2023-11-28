import { Popup } from 'react-map-gl';
import React from 'react';
import { CityProps } from '@/types/attractions-restaurants';
import { MapItemCard } from '../map-item-card/MapItemCard';
interface MapPopUpProps {
  popupInfo: CityProps;
  setPopupInfo: React.Dispatch<React.SetStateAction<CityProps | null>>;
  onImageComplete: boolean;
  setOnImageComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MapPopUp: React.FC<MapPopUpProps> = ({
  popupInfo,
  setPopupInfo,
  onImageComplete,
  setOnImageComplete,
}) => {
  return (
    <Popup
      anchor="bottom"
      longitude={Number(popupInfo.address.location.lng)}
      latitude={Number(popupInfo.address.location.lat)}
      onClose={() => {
        setPopupInfo(null);
      }}
      maxWidth="240px"
      offset={20}
    >
      <MapItemCard
        onImageComplete={onImageComplete}
        setOnImageComplete={setOnImageComplete}
        popupInfo={popupInfo}
      />
    </Popup>
  );
};
