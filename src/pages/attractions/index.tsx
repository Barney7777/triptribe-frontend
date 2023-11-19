import { NextPage } from 'next/types';
import MainPage from '@/sections/restaurant-attraction-page/main-page';
import { MainType } from '@/types/general';
import { Layout } from '@/layouts/MainLayout';

const Page: NextPage = () => {
  return (
    <Layout>
      <MainPage type={MainType.Attraction} />
    </Layout>
  );
};

export default Page;
