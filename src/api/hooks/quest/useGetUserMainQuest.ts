import { getUserMainQuest } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserMainQuest = (userId: string, mainQuestId: string) => {
  return useQuery({
    queryKey: ['main-quest', 'user', userId, mainQuestId],
    queryFn: () => getUserMainQuest(userId, mainQuestId),
  });
};
