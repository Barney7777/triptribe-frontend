import React from 'react';
import Box from '@mui/material/Box';
import { BannerMapToggle } from '@/sections/home/banner-map-toggle';
import HomepageContent from '@/sections/home/HomepageContent';
import Layout from '@/layouts/MainLayout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Seo from '@/components/seo';
import { SeoProps } from '@/types/seo';

type MapQueryShown = boolean;
const HomePage: React.FC = ({
  mapQueryShown,
  seoValue,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Seo
        title={seoValue.title}
        description={seoValue.description}
        url={seoValue.url}
        type={seoValue.type}
        name={seoValue.name}
        img={seoValue.img}
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
  const seoValue: SeoProps = {
    title: 'TripTribe - Explore Digital Tourism',
    description:
      'Discover attractions and restaurants with TripTribe, a platform designed to reshape digital tourism. Transparent ratings and authentic reviews guide you through a seamless travel experience.',
    url: 'https://www.trip-tribe.com/',
    type: 'webapp',
    name: 'TripTribe',
    img: '/assets/bridge.png',
  };
  return {
    props: {
      mapQueryShown,
      seoValue,
    },
  };
}) satisfies GetServerSideProps<{
  mapQueryShown: MapQueryShown;
  seoValue: SeoProps;
}>;
