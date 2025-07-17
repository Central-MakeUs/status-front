import { useQuery } from '@tanstack/react-query';
import { getUserMainQuests } from '@/api/quest';

export const useGetUserMainQuests = (userId: string) => {
  return useQuery({
    queryKey: ['main-quests', 'user', userId],
    queryFn: () => getUserMainQuests(userId),
  });
};
