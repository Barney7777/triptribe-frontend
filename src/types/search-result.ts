import { Address } from './address';
import { BusinessTime } from './businessTime';
import { Photo } from './photo';

export type SearchDataType<T> = {
  Attraction: T[];
  Restaurant: T[];
  [key: string]: any;
};

// export type SearchDataOptions = {
//   name: string;
//   type: string;
//   _id: string;
//   description?: string;
//   website?: string;
//   email?: string;
//   phone?: string;
//   openHours?: {
//     Monday: BusinessTime;
//     Tuesday: BusinessTime;
//     Wednesday: BusinessTime;
//     Thursday: BusinessTime;
//     Friday: BusinessTime;
//     Saturday: BusinessTime;
//     Sunday: BusinessTime;
//   };
//   address?: Address;
//   overAllRating?: number;
//   photos?: Photo[];
//   createdUserId?: string;
// };
