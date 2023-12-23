import { UserContext } from '@/contexts/user-context/user-context';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { UserAvatar } from './user-avatar';
import { grey } from '@mui/material/colors';
import { AccountMenu } from './account-menu';

export const AccountDetail = () => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  return (
    <List disablePadding>
      <ListItem>
        <ListItemIcon sx={{ ml: 0, mr: 1 }}>
          <AccountMenu anchorOffset={118} />
        </ListItemIcon>
        <ListItemText
          primary={userData?.nickname}
          primaryTypographyProps={{ color: 'white' }}
          secondary={userData?.email}
          secondaryTypographyProps={{ color: grey[400] }}
        />
      </ListItem>
    </List>
  );
};
