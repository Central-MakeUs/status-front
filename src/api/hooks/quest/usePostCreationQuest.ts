import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreationQuest } from '@/api/quest';
import type { CreateQuestRequestDTO } from '@/api/types/quest';

export const usePostCreationQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateQuestRequestDTO) => postCreationQuest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quest', 'me'],
      });
      queryClient.invalidateQueries({
        queryKey: ['sub-quests', 'all'],
      });
    },
  });
};
