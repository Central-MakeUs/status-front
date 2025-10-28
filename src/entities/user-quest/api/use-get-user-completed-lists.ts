import { useQuery } from '@tanstack/react-query';
import { getUsersCompletedHistory } from '@/shared/api/user-quest';

export const useGetUsersCompletedLists = (id: number) => {
  return useQuery({
    queryKey: ['completed-quests', id],
    queryFn: () => getUsersCompletedHistory(id),
  });
};
