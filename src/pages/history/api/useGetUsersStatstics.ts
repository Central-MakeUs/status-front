import { useQuery } from '@tanstack/react-query';
import { getUsersStatistics } from '@/entities/main-quest/api/mainQuest';

export const useGetUsersStatistics = () => {
  return useQuery({
    queryKey: ['quest', 'statistics'],
    queryFn: () => getUsersStatistics(),
  });
};
