import React from 'react';
import HomepageList from './HomepageList';
import Box from '@mui/material/Box';

const HomepageContent: React.FC = () => {
  // mock data only, will fetch data from backend in ext stage
  type ImageData = {
    imageSrc: string;
    title: string;
    comment: string;
    rating: number;
  };
  const exampleImageData1: ImageData = {
    imageSrc: '/assets/operahouse01.png',
    title: 'Opera House',
    comment:
      'The Sydney Opera House, an architectural marvel on Sydney Harbour, boasts a sail-like design. This globally acclaimed venue hosts diverse cultural performances, blending artistic excellence with stunning waterfront views. As a UNESCO World Heritage Site, it symbolizes Sydney rich cultural heritage.',
    rating: 3,
  };
  const exampleImageData2: ImageData = {
    imageSrc: '/assets/restaurant01.jpg',
    title: 'Ribeye Rendezvous',
    comment:
      'Welcome to our steakhouse! We offer exceptional steaks crafted from premium beef using unique techniques for rich flavors. From classic ribeye to succulent filet mignon, our diverse menu guarantees a delightful dining experience. Indulge in our flavorful steaks and enjoy attentive service in a cozy setting!',
    rating: 3,
  };
  const attractionsImageList: ImageData[] = Array(8).fill(exampleImageData1);
  const restaurantsImageList: ImageData[] = Array(8).fill(exampleImageData2);

  return (
    <Box
      sx={{ '& > *': { my: 10 } }}
      data-testid="homepage-content"
    >
      <HomepageList
        listTitle="Attractions"
        imageList={attractionsImageList}
      />
      <HomepageList
        listTitle="Restaurants"
        imageList={restaurantsImageList}
      />
    </Box>
  );
};

export default HomepageContent;
