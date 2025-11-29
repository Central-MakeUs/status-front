import { useQuery } from '@tanstack/react-query';
import { getUserTodaySubQuestsByMainQuest } from '@/shared/api/user-quest';

export const useGetUserTodaySubQuestsByMainQuest = (id: number) => {
  return useQuery({
    queryKey: ['sub-quests', 'user', id],
    queryFn: () => getUserTodaySubQuestsByMainQuest(id),
  });
};
