import { IconButton, IconButtonProps } from '@mui/material';
import { FC } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface CustomFavoriteIconButtonProps extends IconButtonProps {
  onClick: () => void;
  isFavorite: boolean;
}

const FavoriteIconButton: FC<CustomFavoriteIconButtonProps> = ({
  onClick,
  isFavorite,
  ...props
}) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{ cursor: 'pointer' }}
      {...props}
    >
      {isFavorite ? <Favorite color="error" /> : <FavoriteBorder color="error" />}
    </IconButton>
  );
};

export default FavoriteIconButton;
