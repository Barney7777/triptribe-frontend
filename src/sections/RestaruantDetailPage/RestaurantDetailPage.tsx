import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DetailPageLayout from './components/Layout';
import DetailPageDescription from './components/DetailPageDescription';
import DetailPageHeader from './components/DetailPageHeader';

const RestaurantDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [restaurantData, setRestaurantData] = useState<string>('');

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        setRestaurantData(id as string);
      }, 1000);
    }
  }, [id]);

  return (
    <DetailPageLayout>
      <DetailPageHeader />
      <DetailPageDescription />
      <h1>Restaurant Detail Page</h1>
      {restaurantData ? <h1>Restaurant: {restaurantData}</h1> : <p>Loading...</p>}
    </DetailPageLayout>
  );
};

export default RestaurantDetailPage;
