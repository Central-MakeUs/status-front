import { useQuery } from '@tanstack/react-query';
import { getUsersStatistics } from '@/shared/api/quest-template';

export const useGetUsersStatistics = () => {
  return useQuery({
    queryKey: ['quest', 'statistics'],
    queryFn: () => getUsersStatistics(),
  });
};
