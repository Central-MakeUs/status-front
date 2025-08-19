import { getUserStatistic } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetuserStatistic = () => {
  return useQuery({
    queryKey: ['quest', 'completed-mainquests'],
    queryFn: () => getUserStatistic(),
  });
};
