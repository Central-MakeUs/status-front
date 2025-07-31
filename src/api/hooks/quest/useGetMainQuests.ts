import { useQuery } from '@tanstack/react-query';
import { getMainQuests } from '@/api/quest';
import type { GetMainQuestsParams } from '@/api/types/quest';

export const useGetMainQuests = ({
  attributes,
  theme,
}: GetMainQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'main-quests', attributes, theme],
    queryFn: () => getMainQuests({ attributes, theme }),
  });
};
