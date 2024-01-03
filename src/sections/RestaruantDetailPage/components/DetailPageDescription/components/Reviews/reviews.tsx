import { FC, useState } from 'react';
import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import ReviewCard from './components/review-card';
import useRequest from '@/hooks/use-request';
import { Review } from '@/types/review';
import { useRouter } from 'next/router';
import { MainType } from '@/types/general';

const Reviews: FC = () => {
  //request data
  const router = useRouter();
  const placeType = router.pathname.includes(MainType.Attraction)
    ? MainType.Attraction
    : MainType.Restaurant;
  const { id: restaurantId } = router.query;
  const request = {
    // TODO: remove baseURL after backend implemented
    baseURL: 'https://mock.apifox.com/m1/3534088-0-default/api/v1',
    url: `/${placeType}s/${restaurantId}/reviews`,
  };
  const {
    data: reviewsData = [],
    isLoading,
    error,
  } = useRequest<Review[]>(restaurantId ? request : null);

  //TODO: data pagination

  //handle page change
  const defaultPageNumber = 1;
  const [page, setPage] = useState(defaultPageNumber);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Grid container>
        <Grid
          container
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography>Reviews({reviewsData?.length})</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Write a Review
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Box sx={{ minHeight: '300px', mt: 2 }}>
            {reviewsData.map((item) => (
              <ReviewCard
                review={item}
                key={item.id}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Pagination
              color="primary"
              // count={detailPageReviewsData.pageCount}
              // page={detailPageReviewsData.pageNumber}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reviews;
