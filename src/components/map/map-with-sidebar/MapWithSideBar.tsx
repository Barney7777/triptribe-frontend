import { Map } from '@/components/map';
import { MapPins } from '@/components/map/components/MapPins';
import { Location } from '@/types/address';
import { Box, Button, Grid, List, ListItem, Paper } from '@mui/material';
import React, { Suspense, lazy, useCallback, useEffect, useRef } from 'react';
import MapItemCard from '@/components/map/components/MapItemCard';
import { useMapStore } from '@/stores/map-store';

import { CityProps } from '@/types/attractions-restaurants';
import { Loading } from '@/components/Loading';
import { CircularLoading } from '@/components/CircularLoading';

// const LazyMapItemCard = lazy(() => import('@/components/map/components/MapItemCard'));
export const MapWithSideBar = () => {
  const { updateMapCenter, updateHighLightedId, pinInfo, popupInfo } = useMapStore(
    (state) => state
  );

  const listRef = useRef<HTMLUListElement>(null);

  const handleOnHover = (id: string) => {
    updateHighLightedId(id);
  };
  const handleOffHover = (id: string) => {
    updateHighLightedId('');
  };
  const handleSideBarClick = (location: Location) => {
    updateMapCenter(location);
  };

  const handleScroll = useCallback<(popupInfo: CityProps | null) => void>((popupInfo) => {
    if (!popupInfo) return;
    const clickPinId = popupInfo?.type + popupInfo?._id;
    const listItem = document.getElementById('list' + clickPinId);

    if (!listItem) return;
    if (listRef.current) {
      const scrollTop = listItem.offsetTop - listRef.current.offsetTop;
      listRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    handleScroll(popupInfo);
  }, [handleScroll, popupInfo]);

  // when have content :
  // - start: flow in from left - done!
  // - click pin to scroll sidebar to target - done!
  // - use hand drag if can - may not need?
  // - floating on the page left with gap, borderradius
  // - when add or remove, flow the card from left
  // - when data swap, swap the sequence with animation
  // - when empty, all card removed from left, the drawer removed from left

  return (
    <Box>
      <Grid
        id="MapWithSideBar"
        container
        height={'100vh'}
        bgcolor={'white'}
      >
        <Grid
          item
          xs={3}
          marginLeft={pinInfo.length ? '0' : '-25%'}
          sx={{ transition: '0.5s all' }}
        >
          <Box
            position={'relative'}
            sx={{
              overflowY: 'scroll',
              height: '100vh',
              backgroundImage: 'url(/assets/map-sidebar-bkg2.jpg)',
              backgroundAttachment: 'fixed',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
            ref={listRef}
          >
            <List>
              <Box
                position={'absolute'}
                left={0}
                top={0}
                bottom={0}
                width={'100%'}
                // height={'100vh'}
                sx={
                  {
                    // objectFit: 'cover',
                  }
                }
              ></Box>
              {pinInfo.length ? (
                <>
                  {pinInfo.map((item, index) => {
                    return (
                      <ListItem
                        key={item.type + item._id}
                        id={'list' + item.type + item._id}
                      >
                        <Paper
                          elevation={1}
                          sx={{
                            marginY: 1,
                            width: '100%',
                          }}
                          onMouseEnter={() => handleOnHover(`${item.type}-${item._id}`)}
                          onMouseLeave={() => handleOffHover(`${item.type}-${item._id}`)}
                          onClick={() => handleSideBarClick(item.address.location)}
                        >
                          <MapItemCard popupInfo={item} />
                          {/* the effect is not as expected */}
                          {/* <Suspense fallback={<CircularLoading size={40} />}> */}
                          {/* <LazyMapItemCard popupInfo={item} /> */}
                          {/* </Suspense> */}
                        </Paper>
                      </ListItem>
                    );
                  })}
                  <Button>Load More</Button>
                </>
              ) : (
                <>loading</>
              )}
            </List>
          </Box>
        </Grid>
        <Grid
          item
          xs={pinInfo.length ? 9 : 12}
          sx={{ transition: '0.5s all' }}
        >
          <Map
            sx={{ height: '100%' }}
            mapId="RestaurantAttractionMap"
          >
            <>
              <MapPins />
            </>
          </Map>
        </Grid>
      </Grid>
    </Box>
  );
};
