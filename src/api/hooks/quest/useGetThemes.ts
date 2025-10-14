import { useQuery } from '@tanstack/react-query';
import { getThemes } from '@/entities/quest/api/quest';
import type { GetThemesParams } from '@/entities/quest/api/dto';

export const useGetThemes = ({ attributes }: GetThemesParams) => {
  return useQuery({
    queryKey: ['quest', 'themes', attributes],
    queryFn: () => getThemes({ attributes }),
  });
};
