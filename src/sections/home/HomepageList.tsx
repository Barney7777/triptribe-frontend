import React from 'react';
import HomepageCard from './HomepageCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ImageData = {
  imageSrc: string;
  title: string;
  comment: string;
  rating: number;
};

type HomepageListProps = {
  listTitle: string;
  imageList: ImageData[];
};

const HomepageList: React.FC<HomepageListProps> = ({ listTitle, imageList }) => {
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ my: 4 }}
      >
        {listTitle}
      </Typography>
      <Grid
        container
        spacing={3}
      >
        {imageList.map((image, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <HomepageCard
              imageSrc={image.imageSrc}
              title={image.title}
              comment={image.comment}
              rating={image.rating}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomepageList;
