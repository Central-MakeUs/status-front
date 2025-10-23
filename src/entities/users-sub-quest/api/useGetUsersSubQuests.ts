import { useQuery } from '@tanstack/react-query';
import { getUsersSubQuests } from './usersSubQuest';

export const useGetUsersSubQuests = (id: number) => {
  return useQuery({
    queryKey: ['sub-quests', 'user', id],
    queryFn: () => getUsersSubQuests(id),
  });
};
