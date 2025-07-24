import { useQuery } from '@tanstack/react-query';
import { getUserCompletedHistory } from '@/api/quest';

export const useGetUserCompletedLists = (userId: string) => {
  return useQuery({
    queryKey: ['completed-quests', userId],
    queryFn: () => getUserCompletedHistory(userId),
  });
};
