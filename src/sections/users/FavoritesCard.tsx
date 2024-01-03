import { Button, Container, Grid, Typography, CircularProgress } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlaceCard from '../../components/PlaceCard';
import { Attraction, MainType, Restaurant } from '@/types/general';
import axiosInstance from '@/utils/request';
import Error from '@/components/Error';
import useSWR from 'swr';

type FavoritesCardProps = {
  isMe: boolean;
};

export const FavoritesCard: React.FC<FavoritesCardProps> = ({ isMe }) => {
  const restaurantUrl = '/users/me/saves/Restaurant';
  const attractionUrl = '/users/me/saves/Attraction';

  const fetcher = async (url: string) => await axiosInstance.get(url).then((res) => res.data);

  const {
    data: restaurantsData,
    isLoading: isRestaurantsLoading,
    error: restaurantsError,
    mutate: restaurantMutate,
  } = useSWR<Restaurant[]>(restaurantUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: attractionsData,
    isLoading: isAttractionsLoading,
    error: attractionsError,
    mutate: attractionMutate,
  } = useSWR<Attraction[]>(attractionUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleDeleteMyRestaurant = async (restaurantId: string) => {
    await axiosInstance.delete(`/users/me/saves/Restaurant/${restaurantId}`);
    restaurantMutate();
  };

  const handleDeleteMyAttraction = async (attractionId: string) => {
    await axiosInstance.delete(`/users/me/saves/Attraction/${attractionId}`);
    attractionMutate();
  };

  return (
    <Container>
      <Grid
        container
        spacing={4}
        sx={{ display: 'flex', flexDirection: 'col' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
        >
          <Typography
            variant="h6"
            noWrap
          >
            Favorite Restaurants
          </Typography>
        </Grid>
        {isRestaurantsLoading ? (
          <CircularProgress size={40} />
        ) : restaurantsData ? (
          restaurantsData.map((item, index) => {
            const restaurantItem = {
              ...item,
              photos: [
                {
                  imageUrl: `https://loremflickr.com/640/480/restaurant,food?random=${index}`,
                  _id: `${index}`,
                },
              ],
              overAllRating: item?.overAllRating || 0,
            };
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
              >
                <PlaceCard
                  key={index}
                  _id={restaurantItem._id}
                  imageUrl={restaurantItem.photos[0]?.imageUrl}
                  name={restaurantItem.name}
                  description={restaurantItem.description}
                  overAllRating={restaurantItem.overAllRating}
                  placeType={`${MainType.Restaurant}s`}
                />
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DeleteForeverIcon />}
                  color="error"
                  sx={{
                    display: isMe ? 'flex' : 'none',
                    ml: 'auto',
                    mr: 'auto',
                  }}
                  onClick={() => handleDeleteMyRestaurant(restaurantItem._id)}
                >
                  Delete
                </Button>
              </Grid>
            );
          })
        ) : (
          <Error
            errorMessage={restaurantsError!.message}
            errorStatus={restaurantsError?.response?.status}
          />
        )}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{
            margin: 'auto',
          }}
        >
          <Typography
            variant="h6"
            noWrap
          >
            Favorite Attractions
          </Typography>
        </Grid>
        {isAttractionsLoading ? (
          <CircularProgress size={40} />
        ) : attractionsData ? (
          attractionsData.map((item, index) => {
            const attractionItem = {
              ...item,
              photos: [
                {
                  imageUrl: `https://loremflickr.com/640/480/sydney,attraction?random=${index}`,
                  _id: `${index}`,
                },
              ],
              overAllRating: item?.overAllRating || 0,
            };
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
              >
                <PlaceCard
                  key={index}
                  _id={attractionItem._id}
                  imageUrl={attractionItem.photos[0]?.imageUrl}
                  name={attractionItem.name}
                  description={attractionItem.description}
                  overAllRating={attractionItem.overAllRating}
                  placeType={`${MainType.Attraction}s`}
                />
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DeleteForeverIcon />}
                  color="error"
                  sx={{
                    display: isMe ? 'flex' : 'none',
                    ml: 'auto',
                    mr: 'auto',
                  }}
                  onClick={() => handleDeleteMyAttraction(attractionItem._id)}
                >
                  Delete
                </Button>
              </Grid>
            );
          })
        ) : (
          <Error
            errorMessage={attractionsError!.message}
            errorStatus={attractionsError?.response?.status}
          />
        )}
      </Grid>
    </Container>
  );
};
