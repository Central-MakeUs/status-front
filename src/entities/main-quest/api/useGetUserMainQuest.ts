import { getUserMainQuest } from '@/entities/main-quest/api/mainQuest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserMainQuest = (id: number) => {
  return useQuery({
    queryKey: ['main-quest', 'user', id],
    queryFn: () => getUserMainQuest(id),
  });
};
