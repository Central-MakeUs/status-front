import { useQuery } from '@tanstack/react-query';
import { getThemes } from './mainQuest';
import type { GetThemesParams } from './dto';

export const useGetThemes = ({ attributes }: GetThemesParams) => {
  return useQuery({
    queryKey: ['quest', 'themes', attributes],
    queryFn: () => getThemes({ attributes }),
  });
};
