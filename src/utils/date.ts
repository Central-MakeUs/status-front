import { differenceInWeeks, format, parseISO } from 'date-fns';

export const getTodayString = () => format(new Date(), 'yyyy-MM-dd');

export const getWeeksDifference = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;

  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return differenceInWeeks(end, start);
};
