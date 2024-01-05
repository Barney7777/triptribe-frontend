import React from 'react';
import Box from '@mui/material/Box';
import { BannerMapToggle } from '@/sections/home/banner-map-toggle';
import HomepageContent from '@/sections/home/HomepageContent';
import Layout from '@/layouts/MainLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type MapQueryShown = boolean;

const HomePage: React.FC = ({
  mapQueryShown,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Box>
        <BannerMapToggle mapQueryShown={mapQueryShown} />
        <HomepageContent />
      </Box>
    </Layout>
  );
};

export default HomePage;

// this is used to persist map state when refresh page
export const getServerSideProps: GetServerSideProps = (async (context) => {
  const { query } = context;
  const mapQueryShown: boolean = query.map === 'shown';
  return {
    props: {
      mapQueryShown,
    },
  };
}) satisfies GetServerSideProps<{
  mapQueryShown: MapQueryShown;
}>;
