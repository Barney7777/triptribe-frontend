import { FC } from 'react';
import { RouterLink } from '@/components/router-link';
import { Box, Card, CardMedia, Grid, Link, Rating, Typography } from '@mui/material';
import type { ListingInfoBasic, MainType } from '@/types/general';
import FavoriteToggle from './button/favorite-toggle';
import { red } from '@mui/material/colors';

interface ListingCardProps {
  listingCardInfo: ListingInfoBasic;
  type: MainType;
}
const ListingCard: FC<ListingCardProps> = ({ listingCardInfo, type }) => {
  const { _id, photos, overAllRating, name, description } = listingCardInfo;
  const path = `/${type}s/${_id}`;

  return (
    <Card
      elevation={1}
      sx={{ borderRadius: 2, maxHeight: 350, mb: 4 }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
        >
          <Box sx={{ height: 200, mb: 1 }}>
            <CardMedia
              sx={{ height: '100%' }}
              component={RouterLink}
              href={path}
              image={photos[0].imageUrl}
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Box sx={{ maxHeight: 20, overflow: 'hidden', whiteSpace: 'normal', mb: 1, paddingX: 1 }}>
            <Link
              color="text.primary"
              component={RouterLink}
              href={path}
              underline="none"
              fontSize={16}
              fontWeight={500}
            >
              {name}
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              height: 50,
              overflow: 'hidden',
              whiteSpace: 'normal',
              mb: 1,
              paddingX: 1,
            }}
          >
            <Typography
              color="text.secondary"
              variant="body1"
            >
              {description}
            </Typography>
          </Box>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={6}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <FavoriteToggle
                outlineColor={red[300]}
                checkedColor={red[400]}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Rating
                name="read-only"
                value={overAllRating}
                readOnly
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ListingCard;
