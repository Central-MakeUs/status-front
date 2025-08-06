import { getUserSubQuestsAll } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSubQuestsAll = () => {
  return useQuery({
    queryKey: ['sub-quests', 'all'],
    queryFn: () => getUserSubQuestsAll(),
  });
};
