import { getUserStatistic } from '@/entities/main-quest/api/mainQuest';
import { useQuery } from '@tanstack/react-query';

export const useGetuserStatistic = () => {
  return useQuery({
    queryKey: ['quest', 'statistics'],
    queryFn: () => getUserStatistic(),
  });
};
