import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserQuest } from '@/api/quest';
import type { QuestCreationRequestDTO } from '@/api/types/quest';

export const usePostUserQuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: QuestCreationRequestDTO) => postUserQuest(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['quests', 'user', variables.userId],
      });
    },
  });
};
