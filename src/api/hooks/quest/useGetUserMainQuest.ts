import { getUserMainQuest } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserMainQuest = (id: number) => {
  return useQuery({
    queryKey: ['main-quest', 'user', id],
    queryFn: () => getUserMainQuest(id),
  });
};
