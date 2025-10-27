import { useQuery } from '@tanstack/react-query';
import { getUsersSubQuests } from './user-quest';

export const useGetUsersSubQuests = (id: number) => {
  return useQuery({
    queryKey: ['sub-quests', 'user', id],
    queryFn: () => getUsersSubQuests(id),
  });
};
