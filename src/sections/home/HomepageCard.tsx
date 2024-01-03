import React, { useContext, useState, useEffect } from 'react';
import { Box, Card, Link } from '@mui/material';
import { RouterLink } from '@/components/router-link';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { truncateText } from '@/utils/truncate-text';
import { UserContext } from '@/contexts/user-context/user-context';
import { usersSaves } from '@/api/usersSaves';
import { usersSavesDelete } from '@/api/usersSavesDelete';
import { useRouter } from 'next/router';
import FavoriteIconButton from './favoriteIconButton';

type ImageCardProps = {
  _id: string;
  name: string;
  description: string;
  overAllRating: number;
  imageUrl: string;
  placeType: string;
};

const HomepageCard: React.FC<ImageCardProps> = ({
  _id,
  imageUrl,
  name,
  description,
  overAllRating,
  placeType,
}) => {
  const path = `/${placeType}/${_id}`;
  const { isAuthenticated, userData } = useContext(UserContext);
  const router = useRouter();
  const [isFavorite, setisFavorite] = useState(false);

  const initialCheck = () => {
    if (
      isAuthenticated &&
      userData &&
      (placeType === 'attractions'
        ? userData.savedAttractions.includes(_id)
        : userData.savedRestaurants.includes(_id))
    ) {
      setisFavorite(true);
    } else {
      setisFavorite(false);
    }
  };

  const handleClick = async () => {
    if (!isAuthenticated) {
      return router.push('/signin');
    }
    try {
      if (isFavorite) {
        await usersSavesDelete(_id, placeType === 'attractions' ? 'Attraction' : 'Restaurant');
      } else {
        await usersSaves(_id, placeType === 'attractions' ? 'Attraction' : 'Restaurant');
      }
      setisFavorite((isFavorite) => !isFavorite);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  useEffect(() => {
    initialCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Card sx={{ maxWidth: 380, margin: '6px', padding: 0 }}>
      <Box sx={{ height: 200, mb: 1 }}>
        <CardMedia
          sx={{ height: '100%' }}
          component={RouterLink}
          href={path}
          image={imageUrl}
        />
      </Box>
      <CardContent sx={{ padding: '16px' }}>
        <Typography variant="h6">
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
        </Typography>
        <Box
          sx={{
            height: 50,
            overflow: 'hidden',
            whiteSpace: 'normal',
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: '16px' }}
          >
            {truncateText(description, 90)}
          </Typography>
        </Box>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          <FavoriteIconButton
            onClick={handleClick}
            isFavorite={isFavorite}
          />

          <Rating
            data-testid="rating-element"
            name="size-small"
            value={overAllRating}
            size="small"
            precision={0.1}
            readOnly
            style={{ marginRight: '8px' }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HomepageCard;
