import { useQuery } from '@tanstack/react-query';
import { getUsersCompletedMainQuests } from '@/shared/api/user-quest';

export const useGetUsersCompletedMainQuests = () => {
  return useQuery({
    queryKey: ['quest', 'completed-mainquests'],
    queryFn: () => getUsersCompletedMainQuests(),
  });
};
