// export enum PhotoType {
//   ATTRACTION = 'Attraction',
//   RESTAURANT = 'Restaurant',
//   USER = 'User',
//   REVIEW = 'Review',
//   ATTRACTIONS = 'Attractions',
//   RESTAURANTS = 'Restaurants',
//   USERS = 'Users',
//   REVIEWS = 'Reviews',
// }

type PhotoType =
  | 'Attraction'
  | 'Restaurant'
  | 'User'
  | 'Review'
  | 'Attractions'
  | 'Restaurants'
  | 'Users'
  | 'Reviews';

export type Photo = {
  imageAlt: string;
  imageUrl: string;
  imageType: string;
  uploadUserId: string;
  _id?: string;
};
