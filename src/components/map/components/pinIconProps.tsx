import theme from '@/styles/theme';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
export const pinIconList = {
  Restaurant: <RestaurantMenuIcon />,
  Restaurants: <RestaurantMenuIcon />,
  Attraction: <PhotoCameraOutlinedIcon />,
  Attractions: <PhotoCameraOutlinedIcon />,
};
export const pinIconColor = {
  Restaurant: theme.palette.secondary.light,
  Attraction: theme.palette.primary.main,
  Restaurants: theme.palette.secondary.light,
  Attractions: theme.palette.primary.main,
  Selected: 'red',
};
