import React from 'react';
import Box from '@mui/material/Box';
import { BannerMapToggle } from '@/sections/home/banner-map-toggle';
import { HomePageContent } from '@/sections/home/homepage-content';

const HomePage: React.FC = () => {
  return (
    <Box component="main">
      <BannerMapToggle />
      <HomePageContent />
    </Box>
  );
};

export default HomePage;
