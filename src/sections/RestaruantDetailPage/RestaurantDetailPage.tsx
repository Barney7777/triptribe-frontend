import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DetailPageLayout from './components/Layout';
import DetailPageDescription from './components/DetailPageDescription';
import DetailPageHeader from './components/DetailPageHeader';
import useRequest from '@/hooks/use-request';

type RatingDistribution = {
  count: number;
  rating: number;
};

const RestaurantDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [restaurantData, setRestaurantData] = useState<string>('');
  const url = `restaurants/${id}/rating-distributions`;
  const { data, isLoading, error } = useRequest<RatingDistribution[]>(id ? { url } : null);

  useEffect(() => {
    if (id) {
      setRestaurantData(id as string);
    }
  }, [id]);

  return (
    <DetailPageLayout>
      <DetailPageHeader />
      {id ? (
        <DetailPageDescription
          data={data || []}
          error={error}
          isLoading={isLoading}
        />
      ) : null}

      <h1>Restaurant Detail Page</h1>
      {restaurantData ? <h1>Restaurant: {restaurantData}</h1> : <p>Loading...</p>}
    </DetailPageLayout>
  );
};

export default RestaurantDetailPage;
