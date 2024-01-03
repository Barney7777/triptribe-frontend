export interface Review {
  id: string;
  title: string;
  description: string;
  rating: number;
  photos: {
    imageAlt: string;
    imageUrl: string;
  }[];
  updatedAt: string;
  creator: {
    _id: string;
    nickname: string;
    userAvatar: {
      imageAlt: string;
      imageUrl: string;
    };
  };
}
