import { useQuery } from '@tanstack/react-query';
import { getSubQuests } from './subQuest';
import type { GetSubQuestsParams } from './dto';

export const useGetSubQuests = ({
  attributes,
  mainQuest,
}: GetSubQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'sub-quests', attributes, mainQuest],
    queryFn: () => getSubQuests({ attributes, mainQuest }),
  });
};
