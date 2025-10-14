import { getUserStatistic } from '@/entities/quest/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetuserStatistic = () => {
  return useQuery({
    queryKey: ['quest', 'statistics'],
    queryFn: () => getUserStatistic(),
  });
};
