import { Popup } from 'react-map-gl';
import React from 'react';
import { CityProps } from '@/types/attractions-restaurants';
import { MapItemCard } from '@/components/map-item-card/MapItemCard';
type MapPopUpProps = {
  popupInfo: CityProps;
  setPopupInfo: (data: CityProps | null) => void;
  imageComplete: boolean;
  imageCompleteHandler: (state: boolean) => void;
};

export const MapPopUp: React.FC<MapPopUpProps> = ({
  popupInfo,
  setPopupInfo,
  imageComplete,
  imageCompleteHandler,
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
        imageComplete={imageComplete}
        imageCompleteHandler={imageCompleteHandler}
        popupInfo={popupInfo}
      />
    </Popup>
  );
};
