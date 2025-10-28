import { useQuery } from '@tanstack/react-query';
import { getMainQuests } from '@/shared/api/quest-template';
import type { GetMainQuestsParams } from '@/shared/api/quest-template.dto';

export const useGetMainQuests = ({
  attributes,
  theme,
}: GetMainQuestsParams) => {
  return useQuery({
    queryKey: ['quest', 'main-quests', attributes, theme],
    queryFn: () => getMainQuests({ attributes, theme }),
  });
};
