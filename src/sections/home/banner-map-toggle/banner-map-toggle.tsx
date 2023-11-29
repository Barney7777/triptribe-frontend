import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useState } from 'react';
import { HeroBanner } from './components';
import { BannerMap } from './components/banner-map';
import useRouterQuery from '@/hooks/use-router-query';
import { Button } from '@mui/material';

type BannerMapToggleProps = {
  mapQueryShown: boolean;
};

export const BannerMapToggle: React.FC<BannerMapToggleProps> = ({ mapQueryShown }) => {
  const [showMap, setShowMap] = useState<boolean>(mapQueryShown);
  const { urlQuery } = useRouterQuery();
  useEffect(() => {
    if (urlQuery['map'] === 'shown') {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [urlQuery]);
  return <>{showMap ? <BannerMap /> : <HeroBanner />}</>;
};
