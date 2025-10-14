import { useQueryClient } from '@tanstack/react-query';
import { getRandomThemes } from '@/entities/quest/api/quest';
import type { GetRandomThemesParams } from '@/entities/quest/api/dto';

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
