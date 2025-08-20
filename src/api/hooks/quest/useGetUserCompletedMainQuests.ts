import { getUserCompletedMainQuests } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserCompletedMainQuests = () => {
  return useQuery({
    queryKey: ['quest', 'completed-mainquests'],
    queryFn: () => getUserCompletedMainQuests(),
  });
};
