import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import { Attraction, MainType, Restaurant } from '@/types/general';
import useSWR from 'swr';
import axiosInstance from '@/utils/request';
import Error from '@/components/Error';
import PlaceCard from '@/components/PlaceCard';

export const FavoritesCard = () => {
  const restaurantUrl = '/users/me/saves/Restaurant';
  const attractionUrl = '/users/me/saves/Attraction';

  const restaurantsRequest = {
    url: restaurantUrl,
    method: 'get',
  };

  const attractionRequest = {
    url: attractionUrl,
    method: 'get',
  };

  const {
    data: restaurantsData,
    isLoading: isRestaurantsLoading,
    error: restaurantsError,
  } = useSWR<Restaurant[]>(restaurantsRequest, async () => {
    const response = await axiosInstance.request<Restaurant[]>(restaurantsRequest);
    return response.data;
  });

  const {
    data: attractionsData,
    isLoading: isAttractionsLoading,
    error: attractionsError,
  } = useSWR<Attraction[]>(attractionRequest, async () => {
    const response = await axiosInstance.request<Attraction[]>(attractionRequest);
    return response.data;
  });

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
              </Grid>
            );
          })
        ) : (
          <Error
            errorMessage={restaurantsError.message}
            errorStatus={restaurantsError.response?.status}
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
              </Grid>
            );
          })
        ) : (
          <Error
            errorMessage={attractionsError.message}
            errorStatus={attractionsError.response?.status}
          />
        )}
      </Grid>
    </Container>
  );
};
