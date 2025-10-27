import { useQuery } from '@tanstack/react-query';
import { getSubQuests } from '@/shared/api/quest-template';
import type { GetSubQuestsParams } from '@/shared/api/quest-template.dto';

export const useGetSubQuests = ({
  attributes,
  mainQuest,
}: GetSubQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'sub-quests', attributes, mainQuest],
    queryFn: () => getSubQuests({ attributes, mainQuest }),
  });
};
