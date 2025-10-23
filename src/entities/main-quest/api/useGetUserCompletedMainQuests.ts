import { getUserCompletedMainQuests } from '@/entities/main-quest/api/mainQuest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserCompletedMainQuests = () => {
  return useQuery({
    queryKey: ['quest', 'completed-mainquests'],
    queryFn: () => getUserCompletedMainQuests(),
  });
};
