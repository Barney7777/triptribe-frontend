import { Location } from '@/types/address';
import { CityProps } from '@/types/attractions-restaurants';
import { PlacesData } from '@/types/map';

import { create } from 'zustand';

type MapState = {
  mapCenter: Location;
  highLightedId?: string;
  pinInfo: PlacesData;
  imageComplete: boolean;
  popupInfo: CityProps | null;
  zoom: number;
  maxDistance: number;
};
type MapAction = {
  updateMapCenter: (mapCenter: Location) => void;
  updatePinInfo: (pinInfo: PlacesData) => void;
  updateImageComplete: (state: boolean) => void;
  updatePopupInfo: (data: CityProps | null) => void;
  updateHighLightedId: (highLightedId: string) => void;
  updateZoom: (zoom: number) => void;
  updateMaxDistance: (maxDistance: number) => void;
};

export const useMapContext = create<MapState & MapAction>((set) => ({
  mapCenter: { lng: 30, lat: 31 },
  updateMapCenter: (mapCenter) => set(() => ({ mapCenter: mapCenter })),
  highLightedId: '',
  updateHighLightedId: (highLightedId) => set(() => ({ highLightedId: highLightedId })),
  pinInfo: [],
  updatePinInfo: (pinInfo) => set(() => ({ pinInfo: pinInfo })),
  imageComplete: false,
  updateImageComplete: (imageComplete) => set(() => ({ imageComplete: imageComplete })),
  popupInfo: null,
  updatePopupInfo: (popupInfo) => set(() => ({ popupInfo: popupInfo })),
  zoom: 11,
  updateZoom: (zoom) => set(() => ({ zoom: zoom })),
  maxDistance: 30000,
  updateMaxDistance: (maxDistance) => set(() => ({ maxDistance: maxDistance })),
}));
