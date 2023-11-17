export enum PhotoType {
  ATTRACTION = 'Attraction',
  RESTAURANT = 'Restaurant',
  USER = 'User',
  REVIEW = 'Review',
}

export interface Photo {
  imageAlt: string;

  imageUrl: string;

  imageType: PhotoType;

  uploadUserId: string;
}
