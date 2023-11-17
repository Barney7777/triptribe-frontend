import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

import { Location } from '@/types/address';
type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// get local time
export const getLocalTime = (location: Location) => {
  const { lat, lng } = location;
  // const timeZone = find(lat, lng);
  const localTime = dayjs();
  // .tz(timeZone[0]).format('H:mm');
  //
  return localTime;
  //   return { status: '' };
};

export const getCurrentWeekday = (plusDay: number = 0) => {
  const currentWeekday = dayjs().add(plusDay, 'day').format('dddd');
  return currentWeekday as Weekday;
};
