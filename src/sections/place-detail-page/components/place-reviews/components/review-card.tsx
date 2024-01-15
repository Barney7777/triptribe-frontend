import { Avatar, Box, Grid, Rating, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { Review } from '@/types/review';
import Gallery from './gallery';
import dayjs from 'dayjs';
import InnerHTML from 'dangerously-set-html-content';

interface ReviewListProps {
  review: Review;
}

const ReviewCard: FC<ReviewListProps> = ({ review }) => {
  const { title, description, creator, updatedAt, photos } = review;
  const avatarURL = creator?.userAvatar ? creator.userAvatar.imageUrl : undefined;
  const images = useMemo(() => {
    let imageArr = [];
    for (const photo of photos) {
      for (const property in photo) {
        const key = property;
        const value = photo.imageUrl;
        if (key === 'imageUrl') {
          imageArr.push({
            thumbnailURL: value,
            originalURL: value,
          });
        }
      }
    }
    return imageArr;
  }, [photos.length]);

  return (
    <Grid
      container
      sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}
    >
      <Grid
        item
        xs={1}
      >
        <Avatar
          alt="User Avatar"
          src={avatarURL}
          sx={{ height: '40px' }}
        >
          {avatarURL === undefined && creator?.nickname[0]}
        </Avatar>
      </Grid>
      <Grid
        item
        xs={11}
      >
        <Box sx={{ backgroundColor: '#F8F9FA', borderRadius: 3, pt: 1, pb: 2, paddingX: 2 }}>
          <Grid
            container
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Grid
              item
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            >
              <Typography
                fontSize="14px"
                fontWeight="500"
                color="text.primary"
              >
                {creator?.nickname}
              </Typography>

              <Box>
                <Rating
                  name="read-only"
                  value={review.rating}
                  size="small"
                  readOnly
                  sx={{ ml: 1, mt: 1 }}
                />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                fontSize="14px"
                color="text.secondary"
              >
                {dayjs(updatedAt).format('DD/MM/YYYY')}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              fontSize="14px"
              fontWeight="400"
              color={'text.primary'}
            >
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              fontSize="14px"
              color={'text.secondary'}
              sx={{
                overflow: 'auto',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              <InnerHTML html={description} />
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            {images.length ? (
              <Gallery
                galleryID="gallery--open-in-original-size"
                images={images}
              />
            ) : (
              <></>
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReviewCard;
