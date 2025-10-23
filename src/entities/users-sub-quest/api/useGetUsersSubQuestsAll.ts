import { useQuery } from '@tanstack/react-query';
import { getUsersSubQuestsAll } from './usersSubQuest';

export const useGetUsersSubQuestsAll = () => {
  return useQuery({
    queryKey: ['sub-quests', 'all'],
    queryFn: () => getUsersSubQuestsAll(),
  });
};
