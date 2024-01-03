import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

type RatingDistribution = {
  count: number;
  rating: number;
};

const RatingDistribution: React.FC<{ data: RatingDistribution[] }> = ({ data }) => {
  const totalCount: number = data?.reduce((acc, ratings) => acc + ratings.count, 0) || 0;
  const avgRating: number =
    Math.round(
      ((data?.reduce((acc, ratings) => acc + ratings.count * ratings.rating, 0) || 0) /
        totalCount) *
        10
    ) / 10;

  return (
    <Box sx={{ height: '100%', maxWidth: '100%' }}>
      <Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            variant="h6"
            component="div"
          >
            Rating {avgRating ? avgRating : 0}
          </Typography>
          <Rating
            name="half-rating-read"
            value={avgRating}
            defaultValue={0}
            precision={0.5}
            readOnly
            size="small"
            data-testid="rating"
          />
        </Box>

        <Box>
          {data.map((ratings, index) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 2,
              }}
              key={index}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '12px' }}
              >
                {ratings.rating} Stars
              </Typography>
              <Box sx={{ width: '60%' }}>
                <LinearProgress
                  variant="determinate"
                  // {...props}
                  value={Math.round((ratings.count / totalCount) * 100)}
                  sx={{ height: '20px' }}
                  data-testid={`linearProgress-${index}`}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '12px' }}
                >{`${Math.round((ratings.count / totalCount) * 100)}%`}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RatingDistribution;
