import { FC, useEffect, useState } from 'react';
import { Box, Button, Fade, Grid, Pagination, Typography } from '@mui/material';
import ReviewCard from './components/review-card';
import { Review } from '@/types/review';
import { AxiosError } from 'axios';
import { grey } from '@mui/material/colors';
import { CircularLoading } from '@/components/CircularLoading';
import { useRouter } from 'next/router';
import { DEFAULT_PAGE_NUMBER, DEFAULT_REVIEW_PAGE_SIZE } from '@/constants/pagination';
import { PageDataResponse } from '@/types/general';
import { useInView } from 'react-intersection-observer';

type PlaceReviewsProps = {
  reviewPaginationData: PageDataResponse<Review[]>;
  reviewError: AxiosError | undefined;
  reviewIsLoading: boolean;
  writeReview: () => void;
  handleReviewsPageChange: (value: number) => void;
  page: number;
};

const PlaceReviews: FC<PlaceReviewsProps> = ({
  writeReview,
  reviewPaginationData,
  reviewError,
  reviewIsLoading,
  handleReviewsPageChange,
  page,
}) => {
  const { ref, inView, entry } = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);
  const router = useRouter();
  const { data: reviewsData, total, pageCount = 1 } = reviewPaginationData || {};

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    handleReviewsPageChange(value);
  };

  if (reviewIsLoading) return <CircularLoading size={80} />;
  if (reviewError) return <Box>{`${reviewError.code}: ${reviewError.message}`}</Box>;

  return (
    <Fade
      in={show}
      timeout={1100}
    >
      <div ref={ref}>
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
                Reviews ({reviewsData?.length && `${total}`})
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ textTransform: 'none' }}
                onClick={writeReview}
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
              {reviewsData && reviewsData.length ? (
                reviewsData.map((item) => (
                  <ReviewCard
                    review={item}
                    key={item._id}
                  />
                ))
              ) : (
                <p>Please left your review and be the lucky first. Thank you.</p>
              )}
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
                count={pageCount}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default PlaceReviews;
