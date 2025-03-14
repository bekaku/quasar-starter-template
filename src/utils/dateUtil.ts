import {
  formatRelative,
  formatDistance,
  formatDistanceToNow,
  format,
  parse,
  differenceInDays,
  parseISO,
  isEqual,
  isAfter,
  isBefore, differenceInMinutes
} from 'date-fns';
import { th, enUS } from 'date-fns/locale';

export const FORMAT_DATE = 'dd/MM/yyyy'; // 25/05/2022
export const FORMAT_DATETIME = 'dd/MM/yyyy HH:mm:ss'; // 25/05/2022 17:26:31
export const FORMAT_DATE1 = 'dd MMM yyyy'; // 25 JAn 2022
export const FORMAT_DATE2 = 'dd MMMM yyyy'; // 25 May 2022
export const FORMAT_DATE3 = 'E dd MMMM yyyy'; // Wed 25 May 2022
export const FORMAT_DATE4 = 'EEEE dd MMMM yyyy'; // Wednesday 25 May 2022
export const FORMAT_DATE5 = 'E dd MMM yyyy'; // Wed 25 Jan 2022
export const FORMAT_DATE6 = 'PPP'; // May 25th, 2022
export const FORMAT_DATE7 = 'PPPppp'; // May 25th, 2022 at 5:26:31 PM GMT+7
export const FORMAT_DATE8 = 'E dd MMMM yyyy HH:mm:ss'; // Wed 25 May 2022 17:26:31
export const FORMAT_DATE9 = 'dd MMMM yyyy HH:mm:ss'; // 25 May 2022 17:26:31
export const FORMAT_DATE10 = 'yyyy/MM/dd'; // 2022/05/25
export const FORMAT_DATE11 = 'PPPp'; // April 28th, 2022 at 11:30 AM
export const FORMAT_DATE12 = 'PPp'; // Apr 28, 2022, 11:30 AM
export const FORMAT_DATE13 = 'yyyy-MM-dd HH:mm:ss';
export const FORMAT_DATE14 = 'yyyy-MM-dd';
export const FORMAT_DATE15 = 'aaa'; // am, pm
export const FORMAT_DATE16 = 'dd/MM/yy'; // 25/05/22
export const FORMAT_DATE17 = 'dd/MM/yyyy HH:mm'; // 25/05/2022 17:26
export const FORMAT_DATE18 = 'HH:mm'; // 17:26
export const FORMAT_DATE19 = 'dd/MM'; // 25/05
export const FORMAT_DATE20 = 'dd/MM HH:mm'; // 25/05

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
export const getMonthNow = () => {
  return new Date().getMonth();
};
export const getCurrentTimestamp = () => {
  return Date.now();
};
export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0'); // Ensure two digits
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensure two digits
  return `${hours}:${minutes}`;
};
export const getCurrentDateByFormat = (
  forMatString: string | undefined = FORMAT_DATE14// yyyy-MM-dd
) => {
  return formatDateBy(getDateNow(), forMatString);
};
export const convertStringToDate = (
  dateString: string,
  format = 'yyyy-MM-dd HH:mm:ss'
): Date => {
  return parse(dateString, format, new Date());
  // return new Date(dateString);
};
export const convertDateFormatToThai = (dateString?: string | null) => {
  // convert YYYY-MM-DD to DD/MM/YYYY
  if (!dateString) {
    return undefined;
  }
  const parts = dateString.split('-');
  return parts[2] + '/' + parts[1] + '/' + parts[0];
};
export const convertThaiDateFormatToEng = (dateString?: string | null) => {
  // convert DD/MM/YYYY to YYYY-MM-DD
  if (!dateString) {
    return undefined;
  }
  const parts = dateString.split('/');
  return parts[2] + '-' + parts[1] + '-' + parts[0];
};

export const isDate2GreaterThan = (d1: Date, d2: Date) => {
  return d2.getTime() > d1.getTime();
};
export const isDate2GreaterOrEqualThanOnlyDate = (d1: Date, d2: Date) => {
  const tempDate2 = new Date(
    d2.getFullYear(),
    d2.getMonth(),
    d2.getDate(),
    0,
    0,
    0,
    0
  );
  const tempDate1 = new Date(
    d1.getFullYear(),
    d1.getMonth(),
    d1.getDate(),
    0,
    0,
    0,
    0
  );
  return tempDate2.getTime() >= tempDate1.getTime();
};
export const getDateDiff = (dateLeft: Date | number, dateRight: Date | number) => {
  return differenceInDays(dateRight, dateLeft);
};
export const getDateDiffNow = (dateString: string) => {
  const d = removeTime(dateString);
  const currentDate = removeTime(getCurrentDateByFormat());
  if (!d || !currentDate) {
    return 0;
  }
  // return getDateDiff(Date.parse(d), new Date());
  return getDateDiff(Date.parse(d), Date.parse(currentDate));
};

export const getDateAutoFormatBy = (dateString: string | undefined, locale: string = 'th') => {
  if (!dateString) {
    return '';
  }

  const difDays = getDateDiffNow(dateString);
  if (difDays > 0 && difDays < 365) {
    return formatDateTime(dateString, FORMAT_DATE19, locale);
  } else if (difDays > 365) {
    return formatDateTime(dateString, FORMAT_DATE16, locale);
  }
  return formatDateTime(dateString, FORMAT_DATE18, locale);
};
export const getDateTimeAutoFormatBy = (dateString: string | undefined, locale: string = 'th') => {
  if (!dateString) {
    return '';
  }
  const difDays = getDateDiffNow(dateString);
  if (difDays >= 0 && difDays < 1) {
    return formatDateTime(dateString, FORMAT_DATE18, locale);
  } else if (difDays >= 1 && difDays < 365) {
    return formatDateTime(dateString, FORMAT_DATE20, locale);
  } else {
    return formatDateTime(dateString, FORMAT_DATE17, locale);
  }
};
export const getDateDistanceAutoFormatBy = (dateString: string | undefined, locale: string = 'th') => {
  if (!dateString) {
    return '';
  }
  const difDays = getDateDiffNow(dateString);
  if (difDays >= 0 && difDays < 1) {
    return formatDistanceFromNow(dateString, locale);
  } else if (difDays >= 1 && difDays < 365) {
    return formatDateTime(dateString, FORMAT_DATE20, locale);
  } else {
    return formatDateTime(dateString, FORMAT_DATE17, locale);
  }
};

/**
 * formatRelativeFromNow('2022-05-25 17:26:31', locale.value)
 * @param dateString
 * @param locale
 * @returns
 */
export const formatRelativeFromNow = (
  dateString: string | undefined,
  locale: string = 'th'
) => {
  if (!dateString) {
    return;
  }
  return formatRelative(Date.parse(dateString), new Date(), {
    locale: locale == 'th' ? th : enUS
  });
};
/**
 * formatDistanceFromNow('2022-05-25 17:26:31', locale.value)
 * @param dateString
 * @param locale
 * @param suffix
 * @returns
 */
export const formatDistanceFromNow = (
  dateString: string,
  locale: string | unknown,
  suffix: boolean = false
) => {
  return formatDistanceToNow(convertStringToDate(dateString), {
    locale: locale == 'th' ? th : enUS,
    addSuffix: suffix
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
      addSuffix: true
    }
  );
};
export const removeTime = (datetimeString: string) => {
  return datetimeString ? datetimeString.split(' ')[0] : '';
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
    locale: locale == 'th' ? th : enUS
  });
};
/**
 *
 * @param dateLeft the later date
 * @param dateRight the earlier date
 * @returns
 */
export const getDateDiffMinutes = (
  dateLeft: Date | number,
  dateRight: Date | number
) => {
  return differenceInMinutes(dateRight, dateLeft);
};
export const formatDate = (
  dateString: string | undefined,
  forMatString: string,
  locale: string | unknown
) => {
  if (!dateString) {
    return undefined;
  }
  const d = removeTime(dateString);
  return d
    ? format(convertStringToDate(d, FORMAT_DATE14), forMatString, {
      locale: locale == 'th' ? th : enUS
    })
    : undefined;
};
export const formatDateBy = (d: Date, forMatString: string) => {
  return format(d, forMatString);
};
export const formatIos = (d: string, forMatString: string) => {
  return format(parseISO(d), forMatString);
};

export const isDateEqua = (dateLeft: string, dateRight: string) => {
  const d1 = convertStringToDate(dateLeft, FORMAT_DATE14);
  const d2 = convertStringToDate(dateRight, FORMAT_DATE14);
  return isEqual(d1, d2);
};
export const isDateAfter = (dateLeft: string, dateRight: string) => {
  const d1 = convertStringToDate(dateLeft, FORMAT_DATE14);
  const d2 = convertStringToDate(dateRight, FORMAT_DATE14);
  return isAfter(d1, d2);
};
export const isDateBefore = (dateLeft: string, dateRight: string) => {
  const d1 = convertStringToDate(dateLeft, FORMAT_DATE14);
  const d2 = convertStringToDate(dateRight, FORMAT_DATE14);
  return isBefore(d1, d2);
};
