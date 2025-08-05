import { getUserMainQuest } from '@/api/quest';
import { useQuery } from '@tanstack/react-query';

export const useGetUserMainQuest = (mainQuestId: string) => {
  return useQuery({
    queryKey: ['main-quest', 'user', mainQuestId],
    queryFn: () => getUserMainQuest(mainQuestId),
  });
};
