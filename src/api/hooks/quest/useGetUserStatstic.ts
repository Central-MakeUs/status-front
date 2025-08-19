import { getUserStatistic } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetuserStatistic = () => {
  return useQuery({
    queryKey: ['history', 'user'],
    queryFn: () => getUserStatistic(),
  });
};
