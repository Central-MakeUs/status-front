import { useQueryClient } from '@tanstack/react-query';
import { getRandomThemes } from '../../../shared/api/quest-template';
import type { GetRandomThemesParams } from '../../../shared/api/quest-template.dto';

export const useGetRandomThemes = () => {
  const queryClient = useQueryClient();

  const refreshThemes = async ({
    attributes,
    themes,
  }: GetRandomThemesParams) => {
    const newThemes = await getRandomThemes({
      attributes,
      themes,
    });

    queryClient.setQueryData(['quest', 'themes', attributes], newThemes);
  };

  return { refreshThemes };
};
