import { useQuery } from '@tanstack/react-query';
import { getRandomSubQuestByMainQuestId } from '@/api/quest';
import type { GetRandomSubQuestByMainQuestIdParams } from '@/api/types/quest';

export const useGetRandomSubQuestByMainQuestId = ({
  mainQuestId,
  selectedSubQuestIds,
  limit,
}: GetRandomSubQuestByMainQuestIdParams) => {
  return useQuery({
    queryKey: ['quests', 'random', mainQuestId],
    queryFn: () =>
      getRandomSubQuestByMainQuestId({
        mainQuestId,
        selectedSubQuestIds,
        limit,
      }),
  });
};
