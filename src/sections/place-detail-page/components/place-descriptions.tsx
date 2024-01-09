import { Box, Typography } from '@mui/material';
import React from 'react';
import IconText from '@/components/IconText';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { PlaceProps } from '@/types/attractions-restaurants';
import { grey } from '@mui/material/colors';

type PlaceDescriptionsProps = {
  placeData: PlaceProps;
};
const borderColor = grey[500];

export const PlaceDescriptions: React.FC<PlaceDescriptionsProps> = ({ placeData }) => {
  return (
    <React.Fragment>
      <Typography
        variant="h6"
        fontWeight={600}
      >
        Descriptions
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginTop: '20px' }}
      >
        {placeData.description.repeat(5)}
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        <IconText
          icon={<RestaurantMenuOutlinedIcon fontSize="small" />}
          text="Menu"
        />
      </Box>
    </React.Fragment>
  );
};
