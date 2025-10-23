import { useQuery } from '@tanstack/react-query';
import { getMainQuests } from '@/entities/main-quest/api/mainQuest';
import type { GetMainQuestsParams } from '@/entities/main-quest/api/dto';

export const useGetMainQuests = ({
  attributes,
  theme,
}: GetMainQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'main-quests', attributes, theme],
    queryFn: () => getMainQuests({ attributes, theme }),
  });
};
