import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import RatingDistributionCard from '@/sections/rating-distribution';
import useRequest from '@/hooks/use-request';
type RatingDistribution = {
  count: number;
  rating: number;
};
const AttractionDetailPage = () => {
  const router = useRouter();
  const { attractionId } = router.query;
  const [attractionData, setAttractionData] = useState<string>('');
  const url = `attractions/${attractionId}/rating-distributions`;
  const { data, isLoading, error } = useRequest<RatingDistribution[]>(
    attractionId ? { url } : null
  );

  useEffect(() => {
    if (attractionId) {
      setAttractionData(attractionId as string);
    }
  }, [attractionId]);

  return (
    <div>
      <h1>Attraction Detail Page</h1>
      {attractionData ? <h1>Attraction: {attractionData}</h1> : <p>Loading..</p>}
      <div>
        {error ? (
          <div>{(error.response?.data as { exceptionMessage?: string })?.exceptionMessage}</div>
        ) : isLoading || !data ? (
          <div>Loading...</div>
        ) : (
          <RatingDistributionCard data={data} />
        )}
      </div>
    </div>
  );
};

export default AttractionDetailPage;
