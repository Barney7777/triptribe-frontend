import { useUserContext } from '@/contexts/UserContext';
import { Avatar } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export const UserAvatar: React.FC = () => {
  const { userData } = useUserContext();
  const avatarUrl = useRef<string | undefined | null>(localStorage.getItem('avatarUrl'));
  useEffect(() => {
    avatarUrl.current = localStorage.getItem('avatarUrl');
  }, [userData]);

  if (avatarUrl.current !== 'undefined') {
    console.log(!!avatarUrl.current);
    return (
      <Avatar
        alt="User Avatar"
        sx={{ width: 40, height: 40 }}
        // src={avatarUrl.current![0]}
      />
    );
  } else {
    return (
      <Avatar
        alt="User Avatar"
        sx={{ width: 40, height: 40 }}
      >
        {userData?.nickname?.[0]?.toUpperCase()}
      </Avatar>
    );
  }
};
