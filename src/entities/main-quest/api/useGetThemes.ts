import { useQuery } from '@tanstack/react-query';
import { getThemes } from '@/entities/main-quest/api/mainQuest';
import type { GetThemesParams } from '@/entities/main-quest/api/dto';

export const useGetThemes = ({ attributes }: GetThemesParams) => {
  return useQuery({
    queryKey: ['quest', 'themes', attributes],
    queryFn: () => getThemes({ attributes }),
  });
};
