import MainPage from '@/sections/listing-page/main-page';
import { MainType } from '@/types/general';
import { FilterFormProvider } from '@/contexts/listing-page/form-context';
import { type ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/layouts/MainLayout';
import Seo from '@/components/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="TripTribe Attractions - Explore Exciting Places"
        description="Browse and explore exciting attractions with TripTribe. Find detailed information, transparent ratings, and authentic reviews to plan your next adventure."
        type="webapp"
        img="https://drive.google.com/uc?export=view&id=13fBD9P9zs4ZO13Jm5kiusEfkYx8eezry"
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
export default Page;
