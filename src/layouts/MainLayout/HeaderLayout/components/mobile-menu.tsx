import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Collapse, Divider, ListItem, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import CottageIcon from '@mui/icons-material/Cottage';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import { LogoImage } from '@/icons/logo-image';
import { MobileMenuListItem } from './components/mobile-menu-list-item';
import { UserAccount } from '../user-account';

type MobileListItems = MobileListItem[];
export type MobileListItem = {
  name: string;
  href: string;
  icon: React.JSX.Element;
};

export const MobileMenuButton = ({ sx }: { sx?: SxProps }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userCollapse, setUserCollapse] = useState(false);
  const theme = useTheme();
  const responsiveStyle = {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  };

  // if is path include user, open user collapse
  const pathName = usePathname();
  useEffect(() => {
    if (pathName.includes('user')) {
      setUserCollapse(true);
    }
  }, [drawerOpen]);

  const handleDrawerOpen = (state: boolean) => {
    setDrawerOpen(() => state);
  };
  const handleUserCollapse = () => {
    setUserCollapse((prev) => !prev);
  };

  const mobileListItem: MobileListItems = [
    { name: 'Homepage', href: '/', icon: <CottageIcon /> },
    { name: 'Attraction', href: '/attractions', icon: <PhotoCameraOutlinedIcon /> },
    { name: 'Restaurant', href: '/restaurants', icon: <RestaurantMenuIcon /> },
    { name: 'User', href: '/user', icon: <PeopleAltOutlinedIcon /> },
  ];
  const mobileUserListItem: MobileListItems = [
    { name: 'Update Profile', href: '/users/me', icon: <ManageAccountsOutlinedIcon /> },
    { name: 'Write a review', href: '/write-review', icon: <ShareOutlinedIcon /> },
  ];

  const drawerItem = () => (
    <Box
      sx={{ width: '280px', px: 2, py: 3 }}
      role="presentation"
      onKeyDown={() => {
        handleDrawerOpen(false);
      }}
      position={'relative'}
    >
      <List
        component={'nav'}
        disablePadding
      >
        {/* Logo button */}

        <ListItem sx={{ padding: 0 }}>
          <ListItemIcon>
            <Box>
              <LogoImage height={40} />
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={'TripTribe'}
            primaryTypographyProps={{ color: 'white' }}
            // secondary={'Premium tier'}
            // secondaryTypographyProps={{ color: '#B5BCC4' }}
          />
        </ListItem>
        <ListItem sx={{ padding: 0, ml: -1, mr: 1 }}>
          <UserAccount
            userAccountStyle={{ justifyContent: 'center' }}
            accountMenuStyle={'account detail'}
          />
        </ListItem>
        <Divider />

        {mobileListItem.map((item, index) => (
          <React.Fragment key={item.name}>
            <MobileMenuListItem
              item={item}
              userCollapse={userCollapse}
              handleUserCollapse={handleUserCollapse}
            />
            {item.name === 'User' && (
              <Collapse
                in={userCollapse}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component={'div'}
                  disablePadding
                >
                  {mobileUserListItem.map((item, index) => (
                    <MobileMenuListItem
                      key={item.name}
                      item={item}
                      listItemStyle={{ pl: 2 }}
                      userCollapse={userCollapse}
                      handleUserCollapse={handleUserCollapse}
                    />
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Button
        variant="text"
        sx={{ ...sx, ...responsiveStyle, marginRight: '4px' }}
        onClick={() => {
          handleDrawerOpen(true);
        }}
      >
        <MenuIcon sx={{ height: '100%', width: 35 }} />
      </Button>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          handleDrawerOpen(false);
        }}
        PaperProps={{ sx: { bgcolor: 'primary.dark' } }}
      >
        {drawerItem()}
      </Drawer>
    </>
  );
};
