import theme from '@/styles/theme';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ForestIcon from '@mui/icons-material/Forest';

export const pinIconList = {
  Restaurant: <RestaurantMenuIcon />,
  Restaurants: <RestaurantMenuIcon />,
  Attraction: <ForestIcon />,
  Attractions: <ForestIcon />,
};
export const pinIconColor = {
  Restaurant: theme.palette.secondary.light,
  Attraction: theme.palette.primary.main,
  Restaurants: theme.palette.secondary.light,
  Attractions: theme.palette.primary.main,
};
