import {
  formatRelative,
  formatDistance,
  formatDistanceToNow,
  format,
  parse,
  differenceInDays,
  parseISO,
} from 'date-fns';
import { th, enUS } from 'date-fns/locale';

export const FORMAT_DATE = 'dd/MM/yyyy'; //25/05/2022
export const FORMAT_DATETIME = 'dd/MM/yyyy HH:mm:ss'; //25/05/2022 17:26:31
export const FORMAT_DATE1 = 'dd MMM yyyy'; //25 JAn 2022
export const FORMAT_DATE2 = 'dd MMMM yyyy'; //25 May 2022
export const FORMAT_DATE3 = 'E dd MMMM yyyy'; //Wed 25 May 2022
export const FORMAT_DATE4 = 'EEEE dd MMMM yyyy'; //Wednesday 25 May 2022
export const FORMAT_DATE5 = 'E dd MMM yyyy'; //Wed 25 Jan 2022
export const FORMAT_DATE6 = 'PPP'; //May 25th, 2022
export const FORMAT_DATE7 = 'PPPppp'; //May 25th, 2022 at 5:26:31 PM GMT+7
export const FORMAT_DATE8 = 'E dd MMMM yyyy HH:mm:ss'; //Wed 25 May 2022 17:26:31
export const FORMAT_DATE9 = 'dd MMMM yyyy HH:mm:ss'; //25 May 2022 17:26:31
export const FORMAT_DATE10 = 'yyyy/MM/dd'; //2022/05/25
export const FORMAT_DATE11 = 'PPPp'; //April 28th, 2022 at 11:30 AM
export const FORMAT_DATE12 = 'PPp'; //Apr 28, 2022, 11:30 AM
export const FORMAT_DATE13 = 'yyyy-MM-dd HH:mm:ss';
export const FORMAT_DATE14 = 'yyyy-MM-dd';
export const FORMAT_DATE15 = 'aaa'; //am, pm

export const addDateByDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};
export const addDateByDaysV2 = (d: Date, days: number) => {
  d.setDate(d.getDate() + days);
  return d;
};
export const getDateNow = () => {
  return new Date();
};
export const getYearNow = () => {
  return new Date().getFullYear();
};
export const getCurrentTimestamp = () => {
  return Date.now();
};
export const convertStringToDate = (
  dateString: string,
  format = 'yyyy-MM-dd HH:mm:ss'
): Date => {
  return parse(dateString, format, new Date());
  // return new Date(dateString);
};
export const isDate2GreaterThan = (d1: Date, d2: Date) => {
  return d2.getTime() > d1.getTime();
};
export const getDateDiff = (dateLeft: Date, dateRight: Date) => {
  return differenceInDays(dateRight, dateLeft);
};

/**
 * formatRelativeFromNow('2022-05-25 17:26:31', locale.value)
 * @param dateString
 * @param locale
 * @returns
 */
export const formatRelativeFromNow = (
  dateString: string | undefined,
  locale: string
) => {
  if (!dateString) {
    return;
  }
  return formatRelative(Date.parse(dateString), new Date(), {
    locale: locale == 'th' ? th : enUS,
  });
};
/**
 * formatDistanceFromNow('2022-05-25 17:26:31', locale.value)
 * @param dateString
 * @param locale
 * @returns
 */
export const formatDistanceFromNow = (
  dateString: string,
  locale: string | unknown,
  suffix = false
) => {
  return formatDistanceToNow(convertStringToDate(dateString), {
    locale: locale == 'th' ? th : enUS,
    addSuffix: suffix,
  });
};
export const formatDistanceFrom = (
  dateString: string,
  fromDateString: string | undefined,
  locale: string | unknown
) => {
  return formatDistance(
    convertStringToDate(dateString),
    fromDateString ? convertStringToDate(fromDateString) : new Date(),
    {
      locale: locale == 'th' ? th : enUS,
      addSuffix: true,
    }
  );
};
/**
 * formatDate('2022-05-25 17:26:31', 'dd MMMM yyyy', locale.value)
 * @param dateString
 * @param forMatString
 * @param locale
 * @returns
 */
export const formatDateTime = (
  dateString: string,
  forMatString: string,
  locale: string | unknown
) => {
  return format(convertStringToDate(dateString), forMatString, {
    locale: locale == 'th' ? th : enUS,
  });
};
export const formatDate = (
  dateString: string,
  forMatString: string,
  locale: string | unknown
) => {
  return format(convertStringToDate(dateString, FORMAT_DATE14), forMatString, {
    locale: locale == 'th' ? th : enUS,
  });
};
export const formatDateBy = (d: Date, forMatString: string) => {
  return format(d, forMatString);
};
export const formatIos = (d: string, forMatString: string) => {
  return format(parseISO(d), forMatString);
};
