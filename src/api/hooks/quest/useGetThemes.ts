import { useQuery } from '@tanstack/react-query';
import { getThemes } from '@/api/quest';
import type { GetThemesParams } from '@/api/types/quest';

export const useGetThemes = ({ attributes }: GetThemesParams) => {
  return useQuery({
    queryKey: ['quest', 'themes', attributes],
    queryFn: () => getThemes({ attributes }),
  });
};
