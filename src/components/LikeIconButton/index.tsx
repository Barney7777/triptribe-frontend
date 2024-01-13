import React, { useEffect } from 'react';
import { Typography, IconButton, SvgIconProps, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSnackbar } from 'notistack';
import axiosInstance from '@/utils/request';
import { MainType } from '@/types/general';
import { UserContext } from '@/contexts/user-context/user-context';
import { LIKE_BUTTON_COLOR } from '@/styles/theme';
import { capitalizeFirstLetter } from '@/utils/cap-string-first-letter';
import { addLikePlace } from './utils/add-like';
import { deleteLikedPlace } from './utils/delete-like';

interface IconTextProps {
  id: string;
  withText: boolean;
  placeType: MainType;
}
export const LikeIconButton: React.FC<IconTextProps> = ({ id, withText, placeType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, userData, initialize } = React.useContext(UserContext);

  const type = capitalizeFirstLetter(placeType);

  const [isCurrentLiked, setIsCurrentLiked] = React.useState<boolean>(false);

  const initialCheck = () => {
    if (
      isAuthenticated &&
      userData &&
      (type === 'Attraction'
        ? userData?.savedAttractions?.includes(id)
        : userData?.savedRestaurants?.includes(id))
    ) {
      setIsCurrentLiked(true);
    } else {
      setIsCurrentLiked(false);
    }
  };

  useEffect(() => {
    initialCheck();
  }, [isAuthenticated]);

  const handleLikeClick = async () => {
    if (!isAuthenticated) {
      enqueueSnackbar('You need to login to save the places', { variant: 'warning' });
      return;
    }

    if (!isCurrentLiked) {
      await addLikePlace(id, type);
      setIsCurrentLiked((isCurrentLiked) => !isCurrentLiked);
      await initialize();
      enqueueSnackbar(`${type} saved successfully`, { variant: 'success' });
    } else {
      await deleteLikedPlace(id, type);
      setIsCurrentLiked((isCurrentLiked) => !isCurrentLiked);
      await initialize();
      enqueueSnackbar(`Remove saved ${type} successfully`, { variant: 'success' });
    }
  };

  const renderIcon = () => {
    // if (isLoading) {
    //   return (
    //     <CircularProgress
    //       color="inherit"
    //       size={20}
    //     />
    //   );
    // } else
    if (!isAuthenticated) {
      return (
        <FavoriteBorderIcon
          fontSize="small"
          sx={{ color: LIKE_BUTTON_COLOR }}
        />
      );
    }

    return userData?.savedAttractions.includes(id) || userData?.savedRestaurants.includes(id) ? (
      <FavoriteIcon
        fontSize="small"
        sx={{ color: LIKE_BUTTON_COLOR }}
      />
    ) : (
      <FavoriteBorderIcon
        fontSize="small"
        sx={{ color: LIKE_BUTTON_COLOR }}
      />
    );
  };
  return (
    <IconButton onClick={handleLikeClick}>
      {renderIcon()}
      {withText ? (
        <Typography
          sx={{ ml: 1, color: 'black' }}
          variant="body2"
        >
          {isCurrentLiked ? 'Unsave' : 'Save'}
        </Typography>
      ) : null}
    </IconButton>
  );
};

export default LikeIconButton;
