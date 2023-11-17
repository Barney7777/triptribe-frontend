import { CityProps } from '@/types/attractions-restaurants';
import { getLocalTime, getCurrentWeekday } from './get-current-date-time';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import { OpeningStatus } from '@/types/businessTime';
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
export const isOpening = (popupInfo: CityProps): OpeningStatus => {
  const weekday = getCurrentWeekday();
  if (popupInfo.openHours[weekday].isClosed) {
    return 'Closed All Day';
  }
  if (popupInfo.openHours[weekday].isOpenAllDay) {
    return 'Opening All Day';
  }
  const { openTime, closeTime } = popupInfo.openHours[weekday].period[0];
  const localTime = getLocalTime(popupInfo.address.location);
  const openTimeParsed = dayjs(openTime, 'H:MM');
  const closeTimeParsed = dayjs(closeTime, 'H:MM');
  // console.log(dayjs(localTime));
  // console.log(localTime, openTimeParsed, closeTimeParsed);
  const isOpeningNow = dayjs(localTime).isBetween(openTimeParsed, closeTimeParsed)
    ? 'Opening'
    : 'Closed';
  return isOpeningNow;
};
