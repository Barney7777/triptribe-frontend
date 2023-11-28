import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useState } from 'react';
import { HeroBanner } from './components';
import { useRouter } from 'next/router';
import { BannerMap } from './components/banner-map';
import useRouterQuery from '@/hooks/use-router-query';

interface BannerMapToggleProps {
  mapQueryShown: boolean;
}

export const BannerMapToggle: React.FC<BannerMapToggleProps> = ({ mapQueryShown }) => {
  const [showMap, setShowMap] = useState<boolean>(mapQueryShown);
  const { urlQuery, setUrlQuery } = useRouterQuery();
  useEffect(() => {
    if (urlQuery['map'] === 'shown') {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [urlQuery]);
  return (
    <>
      {/* <Button onClick={getCurrentTime}>time</Button>
      <Button onClick={() => getCurrentWeekday()}>weekday</Button> */}
      {showMap ? <BannerMap /> : <HeroBanner mapToggleHandler={setUrlQuery} />}
    </>
  );
};
