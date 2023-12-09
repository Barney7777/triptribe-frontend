// import { PlacesData } from '@/types/map';
// import axiosInstance from './request';
// import { Location } from '@/types/address';

// export type HomepageMapFetchData = (
//   center: Location | undefined,
//   distanceAndLimit: { topRatingQuantity: number; maxDistance: number },
//   defaultLocation: Location
// ) => Promise<PlacesData | []>;

// export const homepageMapFetchData: HomepageMapFetchData = (
//   center,
//   distanceAndLimit,
//   defaultLocation
// ) => {
//   // console.log(e.viewState.zoom);
//   console.log(center);
//   return axiosInstance
//     .request<PlacesData>({
//       url: '/search/globalSearch',
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       data: {
//         keyword: '',
//         limit: distanceAndLimit.topRatingQuantity,
//         maxDistance: distanceAndLimit.maxDistance,
//         location: center ?? defaultLocation,
//       },
//     })
//     .then((res) => res.data)
//     .catch((e) => {
//       console.log('wrong', e);
//       return [];
//     });
// };
