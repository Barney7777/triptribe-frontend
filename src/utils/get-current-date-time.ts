import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Weekday } from '@/types/businessTime';
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

type Date = Dayjs | number | undefined;

// get local time
export const getLocalTime = (timeZone: string, date: Date = undefined) => {
  return dayjs(date).tz(timeZone);
};

export const getCurrentWeekday = (
  timeZone: string,
  plusDay: number = 0,
  date: Date = undefined
) => {
  return dayjs(date).tz(timeZone).add(plusDay, 'day').format('dddd') as Weekday;
};
