import {
  differenceInDays,
  differenceInWeeks,
  format,
  isBefore,
  isValid,
  parseISO,
  startOfDay,
} from 'date-fns';

export const getTodayString = () => format(new Date(), 'yyyy-MM-dd');

export const getWeeksDifference = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;

  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return differenceInWeeks(end, start) + 1;
};

export const getDaysDifference = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.floor(differenceInDays(end, start)) + 1;
};

export const isValidDateString = (dateString: string): boolean => {
  if (!dateString) return false;
  const date = parseISO(dateString);
  return isValid(date);
};

export const isNotPastDate = (dateString: string): boolean => {
  const date = startOfDay(parseISO(dateString));
  const today = startOfDay(new Date());
  return !isBefore(date, today);
};
