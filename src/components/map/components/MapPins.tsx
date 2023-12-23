import { CityProps } from '@/types/attractions-restaurants';
import React, { useCallback, useMemo, useState } from 'react';
import { Marker } from 'react-map-gl';
import Pin from '@/components/map/components/individualPin';
import { pinIconColor, pinIconList } from './pinIconProps';

import { useMapContext } from '@/contexts/map-context';
import { MarkerEvent } from 'react-map-gl/dist/esm/types';

export const MapPins: React.FC = () => {
  const highLightedId = useMapContext((state) => state.highLightedId);
  const pinInfo = useMapContext((state) => state.pinInfo);
  const updateImageComplete = useMapContext((state) => state.updateImageComplete);
  const updatePopupInfo = useMapContext((state) => state.updatePopupInfo);
  const [markerLat, setMarkerLat] = useState(0);
  const [markerLng, setMarkerLng] = useState(0);

  const handleMarkerClick = useCallback(
    (e: MarkerEvent<mapboxgl.Marker, MouseEvent>, place: CityProps) => {
      if (e.target.getLngLat().lat !== markerLat && e.target.getLngLat().lng !== markerLng) {
        updateImageComplete(false);
        setMarkerLng(() => e.target.getLngLat().lng);
        setMarkerLat(() => e.target.getLngLat().lat);
      }
      e.originalEvent.stopPropagation();
      updatePopupInfo(place);
    },
    [updateImageComplete, markerLat, markerLng, updatePopupInfo]
  );

  const pins = useMemo(() => {
    if (pinInfo.length == 0) {
      return;
    } else {
      return pinInfo.map((place: CityProps, index) => (
        <React.Fragment key={`marker-${place.type}-${place._id}`}>
          <Marker
            longitude={place.address.location.lng}
            latitude={place.address.location.lat}
            anchor="bottom"
            onClick={(e) => handleMarkerClick(e, place)}
          >
            <Pin
              id={`marker-${place.type}-${place._id}`}
              placeType={place.type}
              placeIcon={pinIconList[place.type]}
              placeColor={
                highLightedId === `${place.type}-${place._id}`
                  ? pinIconColor.Selected
                  : pinIconColor[place.type]
              }
            ></Pin>
          </Marker>
        </React.Fragment>
      ));
    }
  }, [pinInfo, handleMarkerClick, highLightedId]);

  return pins;
};
