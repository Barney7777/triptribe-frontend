import React from 'react';
import Box from '@mui/material/Box';
import { BannerMapToggle } from '@/sections/home/banner-map-toggle';
import HomepageContent from '@/sections/home/HomepageContent';
import { Layout } from '@/layouts/MainLayout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Box component="main">
        <BannerMapToggle />
        <HomepageContent />
      </Box>
    </Layout>
  );
};

export default HomePage;
