import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreationQuest } from '@/api/quest';
import type { CreateQuestRequestDTO } from '@/api/types/quest';

export const usePostCreationQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateQuestRequestDTO) => postCreationQuest(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['quests', 'user', variables.mainQuest],
      });
    },
  });
};
