import { useQuery } from '@tanstack/react-query';
import { getUserTodaySubQuests } from '@/shared/api/user-quest';

export const useGetUserTodaySubQuests = () => {
  return useQuery({
    queryKey: ['sub-quests', 'all'],
    queryFn: () => getUserTodaySubQuests(),
  });
};
