import { useQuery } from '@tanstack/react-query';
import { getUserMainQuests } from '@/api/quest';

export const useGetUserMainQuests = () => {
  return useQuery({
    queryKey: ['main-quests', 'user'],
    queryFn: () => getUserMainQuests(),
  });
};
