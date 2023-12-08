import { FC } from 'react';
import { RouterLink } from '@/components/router-link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import type { ListingInfoBasic, MainType } from '@/types/general';

type ListingCardProps = {
  listingCardInfo: ListingInfoBasic;
  type: MainType;
};
const ListingCard: FC<ListingCardProps> = ({ listingCardInfo, type }) => {
  const { id, image, rating, name, description } = listingCardInfo;
  const path = `/${type}s/${id}`;

  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 4, maxHeight: 380, mb: 5 }}
    >
      <CardMedia
        component={RouterLink}
        href={path}
        image={image}
        sx={{ height: 220 }}
      />
      <Rating
        name="read-only"
        value={rating}
        readOnly
        sx={{ ml: 1, mt: 2 }}
      />
      <CardContent sx={{ p: 1 }}>
        <Link
          color="text.primary"
          component={RouterLink}
          href={path}
          underline="none"
        >
          {name}
        </Link>
        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
          variant="body1"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
