import UserReviewCard from './components/user-reviews-card';
import { useRouter } from 'next/router';
import { useUserContext } from '@/contexts/user-context/user-context';
import useRequest from '@/hooks/use-request';
import { UserReviewResponse } from '@/types/review';
import axiosInstance from '@/utils/request';
import { Box, CircularProgress, Divider, Pagination, Typography } from '@mui/material';
import { useState } from 'react';

const ReviewsCard = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { isAuthenticated, userData = null } = useUserContext();

  /**
   * if path === /users/me, and isAuthenticated === true, get current user data
   * else path === /user/:userId, get this user data
   */
  let queryUserId;
  let isAuthorized = false;

  if (userId === 'me') {
    queryUserId = userData?._id;
    isAuthorized = true;
  } else {
    queryUserId = userId;
    isAuthorized = false;
  }
  const queryUrl = `/users/${queryUserId}/reviews`;
  const { data, isLoading, error, mutate } = useRequest<UserReviewResponse>(
    queryUserId ? { url: queryUrl } : null
  );
  const { creator, reviews } = data || {};

  // delete a review
  const handleDeleteReview = async (reviewDeleteId: string) => {
    // const updatedReview = reviews?.filter((item) => item._id !== reviewDeleteId);
    // const updatedData = { ...data, reviews: updatedReview } as UserReviewResponse;
    await mutate(axiosInstance.delete(`/reviews/${reviewDeleteId}`));
  };

  // edit button href

  //handle page change
  const defaultPageNumber = 1;
  const [page, setPage] = useState(defaultPageNumber);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <CircularProgress size={40} />;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography>Reviews ({reviews?.length})</Typography>
      </Box>
      {/* TODO: pagination of reviews for both frontend and backend */}
      {creator &&
        reviews &&
        reviews.slice(0, 10).map((review) => (
          <UserReviewCard
            creator={creator}
            review={review}
            key={review._id}
            onDelete={() => handleDeleteReview(review._id)}
            onEdit={() => {
              const editPath = `/write-review?placeType=${review.placeType}&placeId=${review.placeId}&reviewId=${review._id}`;
              router.push(editPath);
            }}
            isAuthenticated={isAuthenticated}
            isAuthorized={isAuthorized}
          />
        ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          color="primary"
          // count={detailPageReviewsData.pageCount}
          // page={detailPageReviewsData.pageNumber}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default ReviewsCard;
