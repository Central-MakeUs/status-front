import { useQuery } from '@tanstack/react-query';
import { getUsersStatistics } from './mainQuest';

export const useGetUsersStatistics = () => {
  return useQuery({
    queryKey: ['quest', 'statistics'],
    queryFn: () => getUsersStatistics(),
  });
};
