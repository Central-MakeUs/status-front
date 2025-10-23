import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCreationQuest } from './mainQuest';
import type { CreateQuestRequestDTO } from './dto';

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
