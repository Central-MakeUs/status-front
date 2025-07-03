import { useQuery } from '@tanstack/react-query';
import { getUserQuests } from '@/api/quest';

export const useGetUserQuests = (userId: string) => {
  return useQuery({
    queryKey: ['quests', 'user', userId],
    queryFn: () => getUserQuests(userId),
  });
};
