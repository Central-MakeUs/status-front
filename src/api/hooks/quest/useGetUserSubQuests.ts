import { getUserSubQuests } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSubQuests = (mainQuestId: string) => {
  return useQuery({
    queryKey: ['sub-quests', 'user'],
    queryFn: () => getUserSubQuests(mainQuestId),
  });
};
