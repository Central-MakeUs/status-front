import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { getRandomSubQuests } from '@/api/quest';
import type { RerollSubQuestRequestDTO } from '@/api/types/quest';
import { useQuestCreationStore } from '@/stores/questCreationStore';

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
