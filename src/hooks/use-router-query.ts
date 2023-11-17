import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const useRouterQuery = <T extends Record<string, any>>() => {
  const router = useRouter();
  const urlQuery = router.query as unknown as T;
  console.log('use router====', urlQuery);
  const setUrlQuery = useCallback((queryObj: T) => {
    console.log('router push-------');
    router.push(
      {
        // pathname: '/post/[pid]',
        query: queryObj,
      },
      undefined,
      { shallow: true }
    );
  }, []);

  return {
    isRouterReady: router.isReady,
    urlQuery,
    setUrlQuery,
  };
};

export default useRouterQuery;
