import { useQuery } from '@tanstack/react-query';
import { getUserCompletedHistory } from '@/api/quest';

export const useGetUserCompletedLists = (id: number) => {
  return useQuery({
    queryKey: ['completed-quests', id],
    queryFn: () => getUserCompletedHistory(id),
  });
};
