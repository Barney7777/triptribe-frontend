import MainPage from '@/sections/listing-page/main-page';
import { MainType } from '@/types/general';
import { FilterFormProvider } from '@/contexts/listing-page/form-context';
import { type ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/layouts/MainLayout';
import Seo from '@/components/seo';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { SeoProps } from '@/types/seo';

const Page: NextPageWithLayout = ({
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
      <MainPage type={MainType.Attraction} />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <FilterFormProvider>{page}</FilterFormProvider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const seoValue: SeoProps = {
    title: 'TripTribe Attractions - Explore Exciting Places',
    description:
      'Browse and explore exciting attractions with TripTribe. Find detailed information, transparent ratings, and authentic reviews to plan your next adventure.',
    url: 'https://www.trip-tribe.com/attractions',
    type: 'webapp',
    name: 'TripTribe',
    img: '/assets/bridge.png',
  };
  return {
    props: {
      seoValue,
    },
  };
}) satisfies GetServerSideProps<{
  seoValue: SeoProps;
}>;
export default Page;
