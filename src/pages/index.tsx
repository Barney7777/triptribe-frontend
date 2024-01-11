import React from 'react';
import Box from '@mui/material/Box';
import { BannerMapToggle } from '@/sections/home/banner-map-toggle';
import HomepageContent from '@/sections/home/HomepageContent';
import Layout from '@/layouts/MainLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Seo from '@/components/seo';
type MapQueryShown = boolean;

const HomePage: React.FC = ({
  mapQueryShown,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Seo
        title="TripTribe - Explore Digital Tourism"
        description="Discover attractions and restaurants with TripTribe, a platform designed to reshape digital tourism. Transparent ratings and authentic reviews guide you through a seamless travel experience."
        type="webapp"
        img="https://drive.google.com/uc?export=view&id=13fBD9P9zs4ZO13Jm5kiusEfkYx8eezry"
      />
      <Layout>
        <Box>
          <BannerMapToggle mapQueryShown={mapQueryShown} />
          <HomepageContent />
        </Box>
      </Layout>
    </>
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
