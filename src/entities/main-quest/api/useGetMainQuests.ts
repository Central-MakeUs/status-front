import { useQuery } from '@tanstack/react-query';
import { getMainQuests } from './mainQuest';
import type { GetMainQuestsParams } from './dto';

export const useGetMainQuests = ({
  attributes,
  theme,
}: GetMainQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'main-quests', attributes, theme],
    queryFn: () => getMainQuests({ attributes, theme }),
  });
};
