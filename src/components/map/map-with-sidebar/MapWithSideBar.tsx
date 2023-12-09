import { Map } from '@/components/map';
import { MapPins } from '@/components/map/components/MapPins';
import { Location } from '@/types/address';
import { Box, Button, Grid, List, ListItem, Paper } from '@mui/material';
import React, { useCallback, useEffect, useRef } from 'react';
import { MapItemCard } from '../components';
import { useMapContext } from '@/contexts/map-context';

import { CityProps } from '@/types/attractions-restaurants';

export const MapWithSideBar = () => {
  const updateMapCenter = useMapContext((state) => state.updateMapCenter);
  const updateHighLightedId = useMapContext((state) => state.updateHighLightedId);
  const pinInfo = useMapContext((state) => state.pinInfo);
  const popupInfo = useMapContext((state) => state.popupInfo);

  const listRef = useRef<HTMLUListElement>(null);

  const onHover = (id: string) => {
    updateHighLightedId(id);
  };
  const offHover = (id: string) => {
    updateHighLightedId('');
  };
  const onSideBarClick = (location: Location) => {
    updateMapCenter(location);
  };

  const handleScroll = useCallback<(popupInfo: CityProps | null) => void>((popupInfo) => {
    // console.log('popupInfo', popupInfo);
    if (!popupInfo) return;
    const clickPinId = popupInfo?.type + popupInfo?._id;
    const listItem = document.getElementById('list' + clickPinId);
    // console.log('listitem', listItem);
    // console.log('useRef list', listRef.current);
    if (!listItem) return;
    if (listRef.current) {
      const scrollTop = listItem.offsetTop - listRef.current.offsetTop;
      console.log('scrollTop', scrollTop);
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
            sx={{ overflowY: 'scroll', height: '100vh' }}
            ref={listRef}
          >
            <List>
              {' '}
              <Box
                position={'absolute'}
                left={0}
                top={0}
                bottom={0}
                width={'100%'}
                // height={'100vh'}
                sx={{
                  backgroundImage: 'url(/assets/map-sidebar-bkg2.jpg)',
                  backgroundAttachment: 'fixed',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  // objectFit: 'cover',
                }}
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
                          onMouseEnter={() => onHover(`${item.type}-${item._id}`)}
                          onMouseLeave={() => offHover(`${item.type}-${item._id}`)}
                          onClick={() => onSideBarClick(item.address.location)}
                        >
                          <MapItemCard popupInfo={item} />
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
