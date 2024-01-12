import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { PlaceProps } from '@/types/attractions-restaurants';
import { Typography } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { getCurrentWeekday } from '@/utils/get-current-date-time';
import tz_lookup from 'tz-lookup';

type PlaceLocationProps = {
  placeData: PlaceProps;
};

export const PlaceLocation: React.FC<PlaceLocationProps> = ({ placeData }) => {
  const timeZone = tz_lookup(placeData.address.location.lat, placeData.address.location.lng);
  const weekday = getCurrentWeekday(timeZone);
  const locationDetailList = [
    {
      key: placeData.address.formattedAddress,
      icon: (
        <LocationOnOutlinedIcon
          key="location"
          fontSize="small"
        />
      ),
    },
    {
      key: placeData.email,
      icon: (
        <EmailOutlinedIcon
          key="email"
          fontSize="small"
        />
      ),
    },
    {
      key: placeData.website,
      icon: (
        <ComputerOutlinedIcon
          key="computer"
          fontSize="small"
        />
      ),
    },
    {
      key: `Open Hour from ${placeData.openHours[weekday].period[0].openTime} to ${placeData.openHours[weekday].period[0].closeTime}`,
      icon: (
        <AccessTimeOutlinedIcon
          key="time"
          fontSize="small"
        />
      ),
    },
  ];

  return (
    <List disablePadding>
      <ListItem sx={{ p: 0, pl: 1, mt: 0 }}>
        <Typography
          variant="h5"
          fontWeight={600}
        >
          Location and Contact
        </Typography>
      </ListItem>
      {locationDetailList.map((item, index) => {
        return (
          <ListItem
            key={item.key}
            sx={{ p: 0, pl: 1, mt: 1 }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              sx={{ ml: -1 }}
              primary={item.key}
              primaryTypographyProps={{}}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
