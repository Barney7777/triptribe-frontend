export enum MainType {
  Restaurant = 'restaurant',
  Attraction = 'attraction',
}
export enum MainTypeCapital {
  Restaurant = 'Restaurant',
  Attraction = 'Attraction',
}

export interface PageDataResponse<T> {
  data: T;
  pageCount: number;
}

export interface QueryParamsType {
  pageNumber: number;
  pageSize: number;
  city?: string;
  cost?: number;
}

export interface ListingInfoBasic {
  id: string;
  name: string;
  rating: number;
  image: string;
  description: string;
}
