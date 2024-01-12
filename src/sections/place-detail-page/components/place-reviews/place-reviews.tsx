import { FC, useState } from 'react';
import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import ReviewCard from './components/review-card';
import { Review } from '@/types/review';
import { AxiosError } from 'axios';
import { grey } from '@mui/material/colors';
import { CircularLoading } from '@/components/CircularLoading';

type PlaceReviewsProps = {
  reviewsData: Review[];
  reviewError: AxiosError | undefined;
  reviewIsLoading: boolean;
};
const PlaceReviews: FC<PlaceReviewsProps> = ({ reviewsData, reviewError, reviewIsLoading }) => {
  //TODO: data pagination

  //handle page change
  const defaultPageNumber = 1;
  const [page, setPage] = useState(defaultPageNumber);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  if (reviewIsLoading) return <CircularLoading size={80} />;
  if (reviewError) return <Box>{`${reviewError.code}: ${reviewError.message}`}</Box>;

  return (
    <div>
      <Grid container>
        <Grid
          container
          sx={{
            height: 50,
            px: 1.375,
            pb: 1.25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: grey[400],
          }}
        >
          <Grid item>
            <Typography
              variant="h5"
              lineHeight={1.5}
              fontWeight={600}
            >
              Reviews({reviewsData?.length})
            </Typography>
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
          sx={{
            px: 1.375,
          }}
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

export default PlaceReviews;
