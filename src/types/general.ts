import { z } from 'zod';

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
  total: number;
};

const stringToArray = (value: unknown) => {
  if (typeof value === 'string') {
    return [value];
  }
  return value;
};

export const QueryParamsSchema = z.object({
  pageNumber: z.coerce.number().default(1),
  sort: z.coerce.string().optional(),
  meals: z.preprocess(stringToArray, z.array(z.string()).optional()),
  cuisine: z.preprocess(stringToArray, z.array(z.string()).optional()),
  type: z.preprocess(stringToArray, z.array(z.string()).optional()),
  duration: z.preprocess(stringToArray, z.array(z.string()).optional()),
  distance: z.coerce.number().default(0),
  cost: z.coerce.number().default(0),
  rating: z.coerce.string().optional(),
  open: z.coerce.boolean().default(false),
});
export type QueryParamsType = z.infer<typeof QueryParamsSchema>;

export const FilterQueryParamsSchema = QueryParamsSchema.omit({ pageNumber: true, sort: true });
export type FilterQueryParams = z.infer<typeof FilterQueryParamsSchema>;

export interface ListingInfoBasic {
  _id: string;
  name: string;
  description: string;
  overAllRating: number;
  photos: {
    imageUrl: string;
    _id: string;
  }[];
}

export interface FilterChipData {
  key: string;
  label: string;
  type: keyof FilterQueryParams;
}
