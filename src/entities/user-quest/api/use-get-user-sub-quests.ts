import { useQuery } from '@tanstack/react-query';
import { getUsersSubQuests } from '@/shared/api/user-quest';

export const useGetUsersSubQuests = (id: number) => {
  return useQuery({
    queryKey: ['sub-quests', 'user', id],
    queryFn: () => getUsersSubQuests(id),
  });
};
