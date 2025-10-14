import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { getRandomSubQuests } from '@/entities/quest/api/quest';
import type { RerollSubQuestRequestDTO } from '@/entities/quest/api/dto';
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
