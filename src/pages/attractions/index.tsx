import MainPage from '@/sections/listing-page/main-page';
import { MainType } from '@/types/general';
import { FilterFormProvider } from '@/contexts/listing-page/form-context';
import { type ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/layouts/MainLayout';

const Page: NextPageWithLayout = () => {
  return <MainPage type={MainType.Attraction} />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <FilterFormProvider>{page}</FilterFormProvider>
    </Layout>
  );
};
export default Page;
