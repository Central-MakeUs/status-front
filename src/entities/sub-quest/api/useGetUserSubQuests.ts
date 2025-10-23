import { getUserSubQuests } from '@/entities/sub-quest/api/subQuest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSubQuests = (id: number) => {
  return useQuery({
    queryKey: ['sub-quests', 'user', id],
    queryFn: () => getUserSubQuests(id),
  });
};
