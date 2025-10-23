import { useQuery } from '@tanstack/react-query';
import { getUsersCompletedMainQuests } from './usersMainQuest';

export const useGetUsersCompletedMainQuests = () => {
  return useQuery({
    queryKey: ['quest', 'completed-mainquests'],
    queryFn: () => getUsersCompletedMainQuests(),
  });
};
