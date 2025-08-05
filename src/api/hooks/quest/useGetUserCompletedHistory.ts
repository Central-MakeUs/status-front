import { useQuery } from '@tanstack/react-query';
import { getUserCompletedHistory } from '@/api/quest';

export const useGetUserCompletedLists = (mainQuestId: string) => {
  return useQuery({
    queryKey: ['completed-quests', mainQuestId],
    queryFn: () => getUserCompletedHistory(mainQuestId),
  });
};
