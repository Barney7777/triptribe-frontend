import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { truncateText } from '@/utils/truncate-text';

interface ImageCardProps {
  imageSrc: string;
  title: string;
  comment: string;
  rating: number;
}

const HomepageCard: React.FC<ImageCardProps> = ({
  imageSrc = '/assets/operahouse01.png',
  title = 'Opera House',
  comment = 'The Sydney Opera House, an architectural marvel on Sydney Harbour, boasts a sail-like design. This globally acclaimed venue hosts diverse cultural performances, blending artistic excellence with stunning waterfront views. As a UNESCO World Heritage Site, it symbolizes Sydney rich cultural heritage.',
  rating = 3,
}) => {
  const [showFavorite, setShowFavorite] = useState(true);
  //add function for Favorite checking in accordance with current User in the next stage

  return (
    <Card sx={{ maxWidth: 380, margin: '6px', padding: 0 }}>
      <CardMedia
        component="img"
        height="100%"
        image={imageSrc}
        alt={title}
        sx={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
      />
      <CardContent sx={{ padding: '16px' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontSize: '16px' }}
        >
          {truncateText(comment, 90)}
          {/* {comment} */}
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          {showFavorite && <FavoriteIcon color="error" />}
          <Rating
            name="size-small"
            value={rating}
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
