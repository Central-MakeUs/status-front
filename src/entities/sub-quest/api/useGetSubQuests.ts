import { useQuery } from '@tanstack/react-query';
import { getSubQuests } from '@/entities/sub-quest/api/subQuest';
import type { GetSubQuestsParams } from '@/entities/sub-quest/api/dto';

export const useGetSubQuests = ({
  attributes,
  mainQuest,
}: GetSubQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'sub-quests', attributes, mainQuest],
    queryFn: () => getSubQuests({ attributes, mainQuest }),
  });
};
