import { Location } from '@/types/address';
import React from 'react';

type StaticMapProps = {
  mapCenter: Location;
  zoom?: number;
  width?: number;
  height?: number;
};

export const staticMapUrlGenerator = ({
  mapCenter,
  zoom = 11,
  width = 999,
  height = 999,
}: StaticMapProps): string => {
  const mapToken = process.env.NEXT_PUBLIC_MAP_API_KEY;
  const mapStyle = 'triptribe/clp18ys6w00cb01pq0t4c029g';
  const staticMapUrl =
    'https://api.mapbox.com/styles/v1/' +
    mapStyle +
    `/static/${mapCenter.lng},${mapCenter.lat},${zoom},0/${width}x${height}?access_token=${mapToken}`;
  return staticMapUrl;
};

export const StaticMap: React.FC<StaticMapProps> = ({
  mapCenter,
  zoom = 11,
  width = 999,
  height = 999,
}) => {
  const staticMapUrl = staticMapUrlGenerator({ mapCenter, zoom, width, height });
  return (
    <img
      alt="Static Map"
      src={staticMapUrl}
    />
  );
};
