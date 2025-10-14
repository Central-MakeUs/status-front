import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreationQuest } from '@/entities/quest/api/quest';
import type { CreateQuestRequestDTO } from '@/entities/quest/api/dto';

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
