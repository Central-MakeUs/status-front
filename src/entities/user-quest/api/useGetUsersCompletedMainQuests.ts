import { useQuery } from '@tanstack/react-query';
import { getUsersCompletedMainQuests } from './user-quest';

export const useGetUsersCompletedMainQuests = () => {
  return useQuery({
    queryKey: ['quest', 'completed-mainquests'],
    queryFn: () => getUsersCompletedMainQuests(),
  });
};
