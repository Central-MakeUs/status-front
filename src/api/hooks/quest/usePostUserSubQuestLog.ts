import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserSubQuestLog } from '@/api/quest';
import type { SubQuestLogDTO } from '@/api/types/quest';

export const usePostUserSubQuestLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubQuestLogDTO) => postUserSubQuestLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['completed-quests'],
      });
      queryClient.invalidateQueries({
        queryKey: ['sub-quests', 'user'],
      });
      queryClient.invalidateQueries({
        queryKey: ['attribute'],
      });
      queryClient.invalidateQueries({
        queryKey: ['quest', 'me'],
      });
      queryClient.invalidateQueries({
        queryKey: ['sub-quests', 'all'],
      });
    },
  });
};
