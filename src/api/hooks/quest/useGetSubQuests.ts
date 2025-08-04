import { useQuery } from '@tanstack/react-query';
import { getSubQuests } from '@/api/quest';
import type { GetSubQuestsParams } from '@/api/types/quest';

export const useGetSubQuests = ({
  attributes,
  mainQuest,
}: GetSubQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'sub-quests', attributes, mainQuest],
    queryFn: () => getSubQuests({ attributes, mainQuest }),
  });
};
