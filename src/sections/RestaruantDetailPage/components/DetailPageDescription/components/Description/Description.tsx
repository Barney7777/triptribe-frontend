import { Box, Icon, Typography } from '@mui/material';
import IconText from '@/components/IconText';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';

const Description = () => {
  return (
    <>
      <Typography variant="h6">Descriptions</Typography>
      <Typography
        variant="body2"
        sx={{ marginTop: '20px' }}
      >
        Descriptions This is a modern Cafe. We offer Western Cafe food. Fresh squeezed juice. We
        serve Brunch, Lunch and dinner. Menu
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        <IconText
          icon={<RestaurantMenuOutlinedIcon fontSize="small" />}
          text="Menu"
        />
      </Box>
    </>
  );
};

export default Description;
