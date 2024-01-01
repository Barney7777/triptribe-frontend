import React, { Suspense, useEffect, useState } from 'react';
import { Box, Grid, IconButton, Link, Rating, Typography, Card, Skeleton } from '@mui/material';
import NextLink from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';

import { isOpening } from '@/utils/is-opening';

import { CityProps } from '@/types/attractions-restaurants';
import { getNextOpening } from './utils/getNextOpening';
import { CircularLoading } from '@/components/CircularLoading';

type MapItemCardProps = {
  popupInfo: CityProps;
};

const MapItemCard: React.FC<MapItemCardProps> = ({ popupInfo }) => {
  const [imageComplete, setImageComplete] = useState(false);
  const [likedPlace, setLikedPlace] = useState(false);
  useEffect(() => {
    setImageComplete(false);
  }, [popupInfo._id]);

  // when card off mount, turn it off
  useEffect(() => {
    return () => {
      setImageComplete(false);
    };
  }, []);
  const openingStatus = isOpening(popupInfo);
  // find if the place is liked in the list
  const addLikedPlace = () => {
    setLikedPlace((prev) => !prev);
  };

  const handleImageComplete = () => {
    setImageComplete(true);
  };

  return (
    // add the key will tell react to render the next opened card
    <Card key={`card_${popupInfo.type}_${popupInfo._id}`}>
      <Box position={'relative'}>
        <Link
          component={NextLink}
          href={
            // 'http://localhost:3000' +
            `/${popupInfo.type.toLowerCase()}s/${popupInfo._id}`
          }
        >
          {!imageComplete && (
            // <Skeleton
            //   aria-label={'Image Skeleton'}
            //   variant="rectangular"
            //   width={'100%'}
            //   height={148}
            //   sx={{ position: 'absolute' }}
            // />
            <CircularLoading size={40} />
          )}
          <img
            onLoad={handleImageComplete}
            style={{ objectFit: 'cover' }}
            width={'100%'}
            height={148}
            src={popupInfo.photos[0].imageUrl}
            // className={imageComplete ? 'image-shown' : 'image-hidden'}
            alt={popupInfo.name}
          />
        </Link>
      </Box>

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
    </Card>
  );
};

export default MapItemCard;
