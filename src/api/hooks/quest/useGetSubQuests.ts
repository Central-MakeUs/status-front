import { useQuery } from '@tanstack/react-query';
import { getSubQuests } from '@/entities/quest/api/quest';
import type { GetSubQuestsParams } from '@/entities/quest/api/dto';

export const useGetSubQuests = ({
  attributes,
  mainQuest,
}: GetSubQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'sub-quests', attributes, mainQuest],
    queryFn: () => getSubQuests({ attributes, mainQuest }),
  });
};
