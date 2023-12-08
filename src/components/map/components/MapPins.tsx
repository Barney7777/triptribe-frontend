import { CityProps } from '@/types/attractions-restaurants';
import React, { useCallback, useMemo, useState } from 'react';
import { Marker, MarkerEvent } from 'react-map-gl';
import Pin from '@/components/map/components/individualPin';
import { pinIconColor, pinIconList } from './pinIconProps';
import { PlacesData } from '@/types/map';
type MapPinsProps = {
  pinInfo: PlacesData;
  imageCompleteHandler: (state: boolean) => void;
  setPopupInfo: (data: CityProps | null) => void;
};

export const MapPins: React.FC<MapPinsProps> = ({
  pinInfo,
  imageCompleteHandler,
  setPopupInfo,
}) => {
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);
  const handleMarkerClick = useCallback(
    (e: any, place: CityProps) => {
      if (e.target.getLngLat().lat !== markerLat && e.target.getLngLat().lng !== markerLng) {
        imageCompleteHandler(false);
        setMarkerLat(() => e.target.getLngLat().lat);
        setMarkerLng(() => e.target.getLngLat().lng);
      }
      e.originalEvent.stopPropagation();
      setPopupInfo(place);
    },
    [imageCompleteHandler, markerLat, markerLng, setPopupInfo]
  );

  // const handleMarkerClick = (e: any, place: CityProps) => {
  //   if (e.target.getLngLat().lat !== markerLat && e.target.getLngLat().lng !== markerLng) {
  //     imageCompleteHandler(false);
  //     setMarkerLat(() => e.target.getLngLat().lat);
  //     setMarkerLng(() => e.target.getLngLat().lng);
  //   }
  //   e.originalEvent.stopPropagation();
  //   setPopupInfo(place);
  // };
  const pins = useMemo(() => {
    if (pinInfo.length == 0) {
      return;
    } else {
      return pinInfo.map((place: CityProps, index) => (
        <React.Fragment key={`marker-${place.type}-${place._id}`}>
          <Marker
            color="green"
            longitude={place.address.location.lng}
            latitude={place.address.location.lat}
            anchor="bottom"
            onClick={(e) => handleMarkerClick(e, place)}
          >
            <Pin
              placeType={place.type}
              placeIcon={pinIconList[place.type]}
              placeColor={pinIconColor[place.type]}
            ></Pin>
          </Marker>
        </React.Fragment>
      ));
    }
  }, [pinInfo, handleMarkerClick]);

  return pins;
};
