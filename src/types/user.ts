export type User = {
  _id: string;
  // get from backend and bd, stored in context
  email: string;
  nickname: string;
  // stored in localstorage
  avatarUrl: string;
};

export type FetchedUserData = {
  _id: string;
  email: string;
  nickname: string;
  role: UserRole;
  savedAttractions: SavedAttractions;
  savedRestaurants: SavedRestaurants;
  userAvatar: UserAvatar;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type UserRole = 'user' | 'admin';

export type SavedAttractions = string[];
export type SavedRestaurants = string[];
export type UserAvatar = UserAvatarItem[] | undefined;
export type UserAvatarItem = {
  imageAlt: string;
  imageUrl: string;
  imageType: string;
  uploadUserId: string;
  _id: string;
};
