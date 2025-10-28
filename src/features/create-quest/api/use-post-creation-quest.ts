import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreationQuest } from './create-quest';
import type { CreateQuestRequestDTO } from './create-quest.dto';

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
