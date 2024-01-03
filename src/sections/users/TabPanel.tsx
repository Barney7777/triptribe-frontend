import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { GeneralCard } from '@/sections/users/GeneralCard';
import { SecurityCard } from './SecurityCard';
import { FavoritesCard } from './FavoritesCard';
import ReviewsCard from './ReviewsCard';
import { User } from '@/types/user';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type TabProps = {
  user: User;
  isMe: boolean;
};

const TabPanel: React.FC<TabProps> = ({ user, isMe }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let tabs = [
    {
      label: 'General',
      component: GeneralCard,
      privacyTab: false,
    },
    {
      label: 'Favorites',
      component: FavoritesCard,
      privacyTab: false,
    },
    {
      label: 'Reviews',
      component: ReviewsCard,
      privacyTab: false,
    },
    {
      label: 'Security',
      component: SecurityCard,
      privacyTab: true,
    },
  ];

  if (!isMe) {
    tabs = tabs.filter((tab) => !tab.privacyTab);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs &&
            tabs.map((tab, index) => {
              return (
                <Tab
                  label={tab.label}
                  key={index}
                  {...a11yProps(index)}
                />
              );
            })}
        </Tabs>
      </Box>
      {tabs &&
        tabs.map((tab, index) => {
          return (
            <CustomTabPanel
              value={value}
              key={index}
              index={index}
            >
              <tab.component
                isMe={isMe}
                user={user}
              />
            </CustomTabPanel>
          );
        })}
    </Box>
  );
};

export default TabPanel;
