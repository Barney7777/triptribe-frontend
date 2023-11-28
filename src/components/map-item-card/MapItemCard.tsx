import React, { useState } from 'react';
import { CityProps } from '@/types/attractions-restaurants';
import { Box, Grid, IconButton, Link, Rating, Typography } from '@mui/material';
import NextLink from 'next/link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Skeleton } from '@mui/material';
import { isOpening } from '@/utils/is-opening';
import { getCurrentWeekday } from '@/utils/get-current-date-time';

interface MapItemCard {
  onImageComplete: boolean;
  setOnImageComplete: React.Dispatch<React.SetStateAction<boolean>>;
  popupInfo: CityProps;
}

export const MapItemCard: React.FC<MapItemCard> = ({
  onImageComplete,
  setOnImageComplete,
  popupInfo,
}) => {
  const openingStatus = isOpening(popupInfo);
  // find if the place is liked in the list
  const [likedPlace, setLikedPlace] = useState(false);
  // const [onImageComplete, setOnImageComplete] = useState(false);
  const addLikedPlace = () => {
    setLikedPlace((prev) => !prev);
  };
  return (
    <>
      <Link
        position={'relative'}
        href={`http://localhost:3000/attractions/${popupInfo._id}`}
      >
        {!onImageComplete && (
          <Skeleton
            variant="rectangular"
            width={240}
            height={148}
            sx={{ position: 'absolute' }}
          />
        )}
        <img
          onLoad={() => {
            setOnImageComplete(true);
          }}
          style={{ objectFit: 'cover' }}
          width={240}
          height={148}
          src={popupInfo.photos[0].imageUrl}
          className={` ${!onImageComplete ? 'image-hidden' : 'image-shown'}`}
          alt={popupInfo.name}
        />
      </Link>
      {/* country info */}
      <Box sx={{ height: '55%', p: 1, pt: 0 }}>
        <Grid container>
          <Grid xs={8}>
            <Typography variant="subtitle1">
              {popupInfo.name}, {popupInfo.address.formattedAddress}
            </Typography>
            <Rating
              name="simple-controlled"
              value={popupInfo.overAllRating}
              readOnly
            />
            <Typography
              sx={{
                display: 'inline-block',
                color: openingStatus.includes('Open') ? 'green' : 'red',
                paddingRight: 1,
              }}
            >
              {openingStatus}
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: 'inline-block' }}
            >
              {(() => {
                switch (openingStatus) {
                  case 'Closed All Day':
                    return 'Closed All Day';
                  case 'Opening All Day':
                    return 'Opening';
                  case 'Opening':
                    return `Close at ${
                      popupInfo.openHours[getCurrentWeekday(1)].period[0].closeTime
                    } `;
                  case 'Closed':
                    return `Open at ${
                      popupInfo.openHours[getCurrentWeekday(1)].period[0].openTime
                    }`;
                }
              })()}
            </Typography>
          </Grid>
          <Grid
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
    </>
  );
};
