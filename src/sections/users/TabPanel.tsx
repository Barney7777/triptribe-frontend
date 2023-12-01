import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { GeneralCard } from '@/sections/users/GeneralCard';
import { SecurityCard } from './SecurityCard';
import { FavoritesCard } from './FavoritesCard';
import { ReviewsCard } from './ReviewsCard';
import { User } from '@/types/user';

type TabProps = {
  user: User;
};

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

export default function TabPanel(props: TabProps) {
  const { user } = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="General"
            {...a11yProps(0)}
          />
          <Tab
            label="Favorites"
            {...a11yProps(1)}
          />
          <Tab
            label="Reviews"
            {...a11yProps(2)}
          />
          <Tab
            label="Security"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel
        value={value}
        index={0}
      >
        <GeneralCard user={user} />
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={1}
      >
        <FavoritesCard />
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={2}
      >
        <ReviewsCard />
      </CustomTabPanel>
      <CustomTabPanel
        value={value}
        index={3}
      >
        <SecurityCard />
      </CustomTabPanel>
    </Box>
  );
}
