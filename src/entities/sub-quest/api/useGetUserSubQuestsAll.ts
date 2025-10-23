import { getUserSubQuestsAll } from '@/entities/sub-quest/api/subQuest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSubQuestsAll = () => {
  return useQuery({
    queryKey: ['sub-quests', 'all'],
    queryFn: () => getUserSubQuestsAll(),
  });
};
