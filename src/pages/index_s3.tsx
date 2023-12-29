import React from 'react';
import Box from '@mui/material/Box';
import { BannerMapToggle } from '@/sections/home/banner-map-toggle';
import HomepageContent from '@/sections/home/HomepageContent';
import { Layout } from '@/layouts/MainLayout';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type MapQueryShown = boolean;

const HomePage: React.FC = ({ mapQueryShown }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Box component="main">
        <BannerMapToggle mapQueryShown={mapQueryShown} />
        <HomepageContent />
      </Box>
    </Layout>
  );
};

export default HomePage;

// this is used to persist map state when refreshing the page
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const mapQueryShown: boolean = params?.map === 'shown' || false;

  return {
    props: {
      mapQueryShown,
    },
  };
};
