import { FC } from 'react';
import { Box, Card, CardMedia, Link, Rating, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { RouterLink } from '@/components/router-link';
import type { ListingInfoBasic, MainType } from '@/types/general';

type ListingInfoProps = {
  listingInfo: ListingInfoBasic;
  type: MainType;
};
const ListingList: FC<ListingInfoProps> = ({ listingInfo, type }) => {
  const { id, image, rating, name, description } = listingInfo;
  const path = `/${type}s/${id}`;

  return (
    <Card
      elevation={2}
      sx={{ borderRadius: 4, height: 200, mb: 2 }}
    >
      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Grid xs={4}>
          <Box sx={{ borderRadius: 4, height: 200, width: '100%' }}>
            <CardMedia
              component={RouterLink}
              href={path}
              image={image}
              sx={{ height: '100%', width: '100%' }}
            />
          </Box>
        </Grid>
        <Grid
          container
          xs={8}
          sx={{ display: 'flex', flexDirection: 'column', p: 2 }}
        >
          <Grid>
            <Rating
              name="read-only"
              value={rating}
              readOnly
            />
          </Grid>
          <Grid>
            <Link
              color="text.primary"
              component={RouterLink}
              href={path}
              underline="none"
            >
              {name}
            </Link>
          </Grid>
          <Grid>
            <Typography
              color="text.secondary"
              sx={{
                display: 'block',
                height: 100,
                mt: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ListingList;
