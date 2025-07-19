import { getUserSubQuests } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSubQuests = (userId: string, mainQuestId: string) => {
  return useQuery({
    queryKey: ['sub-quests', 'user', userId],
    queryFn: () => getUserSubQuests(userId, mainQuestId),
  });
};
