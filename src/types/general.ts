export enum MainType {
  Restaurant = 'restaurant',
  Attraction = 'attraction',
}
// export enum MainTypeCapital {
//   Restaurant = 'Restaurant',
//   Attraction = 'Attraction',
// }

export type MainTypeCapital = 'Restaurants' | 'Attractions' | 'Restaurant' | 'Attraction';

export type PageDataResponse<T> = {
  data: T;
  pageCount: number;
};

export type QueryParamsType = {
  pageNumber: number;
  pageSize: number;
  city?: string;
  cost?: number;
};

export type ListingInfoBasic = {
  id: string;
  name: string;
  rating: number;
  image: string;
  description: string;
};
