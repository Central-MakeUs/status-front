import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useQuestCreationStore } from '@/features/create-quest/model/create-quest-store';
import { getRandomSubQuests } from '@/shared/api/quest-template';
import type { RerollSubQuestRequestDTO } from '@/shared/api/quest-template.dto';

export interface GetRandomSubQuestByMainQuestIdParams {
  mainQuestId: string;
  selectedSubQuestIds?: string[];
  limit: number;
}

export const useGetRandomSubQuests = () => {
  const queryClient = useQueryClient();
  const getSelectedSubQuests = useQuestCreationStore(
    (state) => state.getSelectedSubQuests
  );

  return useMutation({
    mutationFn: (data: RerollSubQuestRequestDTO) => getRandomSubQuests(data),
    onSuccess: (newData, variables) => {
      const selectedSubQuests = getSelectedSubQuests();

      queryClient.setQueryData(
        ['quest', 'sub-quests', variables.attributes, variables.mainQuest],
        [...selectedSubQuests, ...newData]
      );
    },
  });
};
