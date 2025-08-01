import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { getRandomSubQuests } from '@/api/quest';
import type { RerollSubQuestRequestDTO } from '@/api/types/quest';

export const useGetRandomSubQuests = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RerollSubQuestRequestDTO) => getRandomSubQuests(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          'quest',
          'sub-quests',
          variables.attributes,
          variables.mainQuest,
        ],
      });
    },
  });
};
