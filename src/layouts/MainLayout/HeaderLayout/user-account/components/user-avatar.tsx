import { UserContext } from '@/contexts/user-context/user-context';
import { Avatar } from '@mui/material';
import React, { useContext } from 'react';

export const UserAvatar: React.FC = () => {
  const { userData } = useContext(UserContext);
  const avatarUrl = userData ? userData.userAvatar?.imageUrl : '';
  const avatarText = userData ? userData.nickname[0]?.toUpperCase() : undefined;

  return (
    <Avatar
      aria-label="User Avatar"
      sx={{ width: 40, height: 40 }}
      src={avatarUrl}
    >
      {avatarText}
    </Avatar>
  );
};
