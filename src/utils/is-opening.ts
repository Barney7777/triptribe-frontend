import { CityProps } from '@/types/attractions-restaurants';
import { getLocalTime, getCurrentWeekday } from './get-current-date-time';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { OpeningStatus } from '@/types/businessTime';
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
import tzlookup from 'tz-lookup';

export const isOpening = (popupInfo: CityProps): OpeningStatus => {
  // the weekday is consist between localTime and weekday.
  const timeZone = tzlookup(popupInfo.address.location.lat, popupInfo.address.location.lng);
  const weekday = getCurrentWeekday(timeZone);

  // console.log(popupInfo.openHours[weekday]);
  if (popupInfo.openHours[weekday].isClosed) {
    return 'Closed All Day';
  }
  if (popupInfo.openHours[weekday].isOpenAllDay) {
    return 'Opening All Day';
  }
  const localTime = getLocalTime(timeZone);

  const { openTime, closeTime } = popupInfo.openHours[weekday].period[0];
  // parse Dayjs obj to string for unify the result
  const localTimeString = dayjs(localTime).format('H:mm');
  // convert time string to time obj
  const localTimeParsed = dayjs(localTimeString, 'H:mm');
  const openTimeParsed = dayjs(openTime, 'H:mm');
  const closeTimeParsed = dayjs(closeTime, 'H:mm');

  const isOpeningNow = dayjs(localTimeParsed).isBetween(openTimeParsed, closeTimeParsed)
    ? 'Opening'
    : 'Closed';
  return isOpeningNow;
};
