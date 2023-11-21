import { Box, Grid, useMediaQuery } from '@mui/material';
import Description from './components/Description';
import { useTheme } from '@mui/material/styles';
import Location from './components/Location';
import RatingDistributionCard from '@/sections/rating-distribution';

type RatingDistribution = {
  count: number;
  rating: number;
};
type DetailPageDescriptionProps = {
  data: RatingDistribution[];
  error: any;
  isLoading: boolean;
};
const DetailPageDescription: React.FC<DetailPageDescriptionProps> = ({
  data,
  error,
  isLoading,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box
      sx={{
        bgcolor: '#F0F5FA',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      data-testid="page-description"
    >
      <Box
        sx={{
          padding: '20px',
          maxWidth: '1200px',
          width: '100%',
          height: '100%',
        }}
      >
        {/* photo */}
        <Box
          sx={{
            borderRadius: '10px',
            maxWidth: '1200px',
            width: '100%',
            bgcolor: 'white',
            maxHeight: '500px',
            height: '300px',
          }}
        >
          <Box sx={{ padding: '32px' }}>photo</Box>
        </Box>
        {/* location and contact */}
        <Box
          sx={{
            borderRadius: '20px',
            marginTop: '20px',
            maxWidth: '1200px',
            width: '100%',
            // bgcolor: 'white',
            // maxHeight: '500px',
          }}
        >
          <Grid
            sx={{ height: '100%', width: '100%' }}
            container
          >
            <Grid
              // sx={{ borderRadius: '10px', padding: '10px' }}
              item
              xs={12}
              md={8}
            >
              <Box
                sx={{
                  bgcolor: 'white',
                  marginRight: isDesktop ? '20px' : '0px',
                  borderRadius: '10px',
                  height: '100%',
                }}
              >
                <Box sx={{ padding: '32px' }}>
                  <Location />
                </Box>
              </Box>
            </Grid>
            <Grid
              sx={{ bgcolor: 'white', borderRadius: '10px', marginTop: isDesktop ? '0px' : '20px' }}
              item
              xs={12}
              md={4}
            >
              <Box sx={{ padding: '32px' }}> map</Box>
            </Grid>
          </Grid>
        </Box>
        {/* description */}
        <Box
          sx={{
            marginTop: '20px',
            borderRadius: '10px',
            maxWidth: '1200px',
            width: '100%',
            bgcolor: 'white',
            maxHeight: '500px',
          }}
        >
          <Box sx={{ padding: '32px' }}>
            <Description />
          </Box>
        </Box>
        {/* rating and review */}
        <Box
          sx={{
            borderRadius: '20px',
            marginTop: '20px',
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '500px',
            height: '300px',
          }}
        >
          <Grid
            sx={{ height: '100%', width: '100%' }}
            container
          >
            <Grid
              item
              xs={12}
              md={4}
            >
              <Box
                sx={{
                  bgcolor: 'white',
                  marginRight: isDesktop ? '20px' : '0px',
                  borderRadius: '10px',
                  height: '100%',
                }}
              >
                <Box sx={{ padding: '32px' }}>
                  {error ? (
                    <div>{error?.response?.data?.exceptionMessage}</div>
                  ) : isLoading || data.length <= 0 ? (
                    <div>Loading...</div>
                  ) : (
                    <RatingDistributionCard data={data} />
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid
              sx={{
                bgcolor: 'white',
                borderRadius: '10px',
                padding: '10px',
                marginTop: isDesktop ? '0px' : '20px',
              }}
              item
              xs={12}
              md={8}
            >
              <Box sx={{ padding: '32px' }}>Reviews</Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailPageDescription;
