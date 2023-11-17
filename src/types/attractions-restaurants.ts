import { BusinessTime } from './businessTime';
import { Address } from './address';
import { Photo } from './photo';
import { MainTypeCapital } from './general';
// export interface SearchResultItem {
//   type?: string;
//   name?: string;
//   _id?: string;
// }

export interface CityProps {
  _id: string;
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  openHours: {
    Monday: BusinessTime;
    Tuesday: BusinessTime;
    Wednesday: BusinessTime;
    Thursday: BusinessTime;
    Friday: BusinessTime;
    Saturday: BusinessTime;
    Sunday: BusinessTime;
  };
  address: Address;
  overAllRating: number;
  photos: Photo[];
  createdUserId: string;
  type: MainTypeCapital;
}
