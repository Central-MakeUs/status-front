import { getUserSubQuests } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSubQuests = (id: number) => {
  return useQuery({
    queryKey: ['sub-quests', 'user', id],
    queryFn: () => getUserSubQuests(id),
  });
};
