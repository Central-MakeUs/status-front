import { useQuery } from '@tanstack/react-query';
import { getThemes } from '../../../shared/api/quest-template';
import type { GetThemesParams } from '../../../shared/api/quest-template.dto';

export const useGetThemes = ({ attributes }: GetThemesParams) => {
  return useQuery({
    queryKey: ['quest', 'themes', attributes],
    queryFn: () => getThemes({ attributes }),
  });
};
