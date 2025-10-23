import { useQuery } from '@tanstack/react-query';
import { getUserCompletedHistory } from '@/entities/main-quest/api/mainQuest';

export const useGetUserCompletedLists = (id: number) => {
  return useQuery({
    queryKey: ['completed-quests', id],
    queryFn: () => getUserCompletedHistory(id),
  });
};
