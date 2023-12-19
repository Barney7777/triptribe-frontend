import { FC } from 'react';
import { Box, Card, CardMedia, Link, Rating, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { RouterLink } from '@/components/router-link';
import type { ListingInfoBasic, MainType } from '@/types/general';
import FavoriteToggle from './button/favorite-toggle';
import { red } from '@mui/material/colors';

type ListingInfoProps = {
  listingInfo: ListingInfoBasic;
  type: MainType;
};
const ListingList: FC<ListingInfoProps> = ({ listingInfo, type }) => {
  const { _id, photos, overAllRating, name, description } = listingInfo;
  const path = `/${type}s/${_id}`;

  return (
    <Card
      elevation={1}
      sx={{ height: 160, mb: 2, borderRadius: 4 }}
    >
      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <Grid xs={4}>
          <Box sx={{ height: 160, width: '100%' }}>
            <CardMedia
              component={RouterLink}
              href={path}
              image={photos[0].imageUrl}
              sx={{ height: '100%', width: '100%' }}
            />
          </Box>
        </Grid>
        <Grid
          container
          xs={8}
          sx={{ display: 'flex', flexDirection: 'column', pl: 2 }}
        >
          <Grid>
            <Link
              color="text.primary"
              component={RouterLink}
              href={path}
              underline="none"
              sx={{ height: 20 }}
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
          <Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FavoriteToggle
                outlineColor={red[300]}
                checkedColor={red[400]}
              />
              <Rating
                name="read-only"
                value={overAllRating}
                readOnly
                sx={{ ml: 1, mt: 1, mr: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ListingList;
