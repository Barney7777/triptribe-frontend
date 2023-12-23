import React, { Suspense, useState } from 'react';
import { Box, Grid, IconButton, Link, Rating, Typography, Card } from '@mui/material';
import NextLink from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';

import { isOpening } from '@/utils/is-opening';

import { useMapContext } from '@/contexts/map-context';
import { CityProps } from '@/types/attractions-restaurants';
import { Loading } from '@/components/Loading';
import { getNextOpening } from './utils/getNextOpening';

type MapItemCardProps = {
  popupInfo: CityProps;
};

export const MapItemCard: React.FC<MapItemCardProps> = ({ popupInfo }) => {
  const imageComplete = useMapContext((state) => state.imageComplete);
  const updateImageComplete = useMapContext((state) => state.updateImageComplete);
  const [likedPlace, setLikedPlace] = useState(false);
  if (!popupInfo) return;

  const openingStatus = isOpening(popupInfo);
  // find if the place is liked in the list
  const addLikedPlace = () => {
    setLikedPlace((prev) => !prev);
  };

  const setImageComplete = () => {
    updateImageComplete(true);
  };

  return (
    <Card>
      <Suspense fallback={<Loading />}>
        <Link
          component={NextLink}
          position={'relative'}
          href={
            // 'http://localhost:3000' +
            `/${popupInfo.type.toLowerCase()}s/${popupInfo._id}`
          }
        >
          {/* {!imageComplete && (
              <Skeleton
                aria-label={'Image Skeleton'}
                variant="rectangular"
                width={'100%'}
                height={148}
                sx={{ position: 'absolute' }}
              />
            )} */}
          <img
            onLoad={setImageComplete}
            style={{ objectFit: 'cover' }}
            width={'100%'}
            height={148}
            src={popupInfo.photos[0].imageUrl}
            className={` ${!imageComplete ? 'image-hidden' : 'image-shown'}`}
            alt={popupInfo.name}
          />
        </Link>
        {/* country info */}
        <Box sx={{ height: '55%', p: 1, pt: 0 }}>
          <Grid container>
            <Grid
              item
              xs={8}
            >
              <Typography variant="subtitle1">
                {popupInfo.type}, {popupInfo.name}
              </Typography>
              <Rating
                name="simple-controlled"
                value={popupInfo.overAllRating}
                readOnly
              />
              <br />
              <Typography
                sx={{
                  display: 'inline-block',
                  color: openingStatus.includes('Open') ? 'green' : 'red',
                  paddingRight: 1,
                }}
              >
                {openingStatus}
              </Typography>
              <br />
              <Typography
                variant="body2"
                sx={{ display: 'inline-block' }}
              >
                {getNextOpening(openingStatus, popupInfo)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: 'flex', justifyContent: 'space-between', height: 40 }}
            >
              <IconButton
                LinkComponent={NextLink}
                href="/write-review"
              >
                <RateReviewIcon
                  sx={{ pt: 0.25 }}
                  color="secondary"
                />
              </IconButton>
              <IconButton onClick={addLikedPlace}>
                {likedPlace ? (
                  <FavoriteIcon sx={{ color: '#ff3d47' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: '#ff6d75' }} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Suspense>
    </Card>
  );
};
