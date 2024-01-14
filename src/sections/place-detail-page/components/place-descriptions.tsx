import { Box, Fade, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import IconText from '@/components/IconText';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { PlaceProps } from '@/types/attractions-restaurants';
import { grey } from '@mui/material/colors';
import { useInView } from 'react-intersection-observer';

type PlaceDescriptionsProps = {
  placeData: PlaceProps;
};
const borderColor = grey[500];

export const PlaceDescriptions: React.FC<PlaceDescriptionsProps> = ({ placeData }) => {
  const { ref, inView, entry } = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);

  return (
    <Fade
      in={show}
      timeout={1100}
    >
      <Box ref={ref}>
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
      </Box>
    </Fade>
  );
};
