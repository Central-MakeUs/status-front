import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useQuestCreationStore } from '../model/questCreationStore';
import { getRandomSubQuests } from './questCreation';
import type { RerollSubQuestRequestDTO } from './dto';

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
