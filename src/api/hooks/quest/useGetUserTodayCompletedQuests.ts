import { useQuery } from '@tanstack/react-query';
import { getTodayCompletedQuests } from '@/api/quest';

export const useGetUserTodayCompletedQuests = (userId: string) => {
  return useQuery({
    queryKey: ['today-completed-quests', userId],
    queryFn: () => getTodayCompletedQuests(userId),
    enabled: !!userId,
  });
};
