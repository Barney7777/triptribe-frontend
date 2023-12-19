import { NextPage } from 'next/types';
import MainPage from '@/sections/listing-page/main-page';
import { MainType } from '@/types/general';
import { FilterFormProvider } from '@/contexts/listing-page/form-context';
import { Layout } from '@/layouts/MainLayout';

const Page: NextPage = () => {
  return (
    <Layout>
      <FilterFormProvider>
        <MainPage type={MainType.Attraction} />
      </FilterFormProvider>
    </Layout>
  );
};

export default Page;
