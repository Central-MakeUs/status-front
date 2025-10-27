import { useQueryClient } from '@tanstack/react-query';
import { getRandomMainQuests } from '../../../shared/api/quest-template';
import type { GetRandomMainQuestsParams } from '../../../shared/api/quest-template.dto';

export const useGetRandomMainQuests = () => {
  const queryClient = useQueryClient();

  const refreshMainQuests = async ({
    attributes,
    theme,
    mainQuests,
  }: GetRandomMainQuestsParams) => {
    const newMainQuests = await getRandomMainQuests({
      attributes,
      theme,
      mainQuests,
    });

    queryClient.setQueryData(
      ['quest', 'main-quests', attributes, theme],
      newMainQuests
    );
  };

  return { refreshMainQuests };
};
