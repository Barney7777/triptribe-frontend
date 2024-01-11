import MainPage from '@/sections/listing-page/main-page';
import { MainType } from '@/types/general';
import { FilterFormProvider } from '@/contexts/listing-page/form-context';
import Layout from '@/layouts/MainLayout';
import { type ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Seo from '@/components/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="TripTribe Restaurants - Culinary Delights Await"
        description="Discover culinary delights with TripTribe Restaurants. Explore a curated list of eateries, backed by transparent ratings and authentic reviews to enhance your dining experience."
        type="webapp"
        img="https://drive.google.com/uc?export=view&id=13fBD9P9zs4ZO13Jm5kiusEfkYx8eezry"
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
export default Page;
