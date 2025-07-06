import { useQuery } from '@tanstack/react-query';
import { getRandomMainQuestByCategoryId } from '@/api/quest';
import type { GetRandomMainQuestByCategoryIdParams } from '@/api/quest';

export const useGetRandomMainQuestByCategoryId = ({
  categoryId,
  limit,
}: GetRandomMainQuestByCategoryIdParams) => {
  return useQuery({
    queryKey: ['quests', 'random', categoryId],
    queryFn: () => getRandomMainQuestByCategoryId({ categoryId, limit }),
  });
};
