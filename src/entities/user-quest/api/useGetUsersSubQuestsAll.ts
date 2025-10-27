import { useQuery } from '@tanstack/react-query';
import { getUsersSubQuestsAll } from './user-quest';

export const useGetUsersSubQuestsAll = () => {
  return useQuery({
    queryKey: ['sub-quests', 'all'],
    queryFn: () => getUsersSubQuestsAll(),
  });
};
