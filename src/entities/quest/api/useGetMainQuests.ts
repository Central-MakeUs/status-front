import { useQuery } from '@tanstack/react-query';
import { getMainQuests } from '@/entities/quest/api/quest';
import type { GetMainQuestsParams } from '@/entities/quest/api/dto';

export const useGetMainQuests = ({
  attributes,
  theme,
}: GetMainQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'main-quests', attributes, theme],
    queryFn: () => getMainQuests({ attributes, theme }),
  });
};
