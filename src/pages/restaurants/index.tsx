import MainPage from '@/sections/listing-page/main-page';
import { MainType } from '@/types/general';
import { FilterFormProvider } from '@/contexts/listing-page/form-context';
import Layout from '@/layouts/MainLayout';
import { type ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
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
      <MainPage type={MainType.Restaurant} />
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
    title: 'TripTribe Restaurants - Culinary Delights Await',
    description:
      'Discover culinary delights with TripTribe Restaurants. Explore a curated list of eateries, backed by transparent ratings and authentic reviews to enhance your dining experience.',
    url: 'https://www.trip-tribe.com/restaurants',
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
