import { useQueryClient } from '@tanstack/react-query';
import { getRandomThemes } from '@/api/quest';
import type { GetRandomThemesParams } from '@/api/types/quest';

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
