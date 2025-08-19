import { getUserStatistic } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetuserStatistic = () => {
  return useQuery({
    queryKey: ['quest', 'statistics'],
    queryFn: () => getUserStatistic(),
  });
};
