import React from 'react';
import HomepageCard from './HomepageCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ImageCardProps = {
  _id: string;
  name: string;
  description: string;
  overAllRating: number;
  photos: {
    imageUrl: string;
    _id: string;
  }[];
};

type HomepageListProps = {
  listTitle: string;
  imageList: ImageCardProps[];
};

const HomepageList: React.FC<HomepageListProps> = ({ listTitle, imageList }) => {
  const placeType = listTitle.toLowerCase();

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
              _id={image._id}
              imageUrl={image.photos[0].imageUrl}
              name={image.name}
              description={image.description}
              overAllRating={image.overAllRating}
              placeType={placeType}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomepageList;
