import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserSubQuestLog } from '@/entities/sub-quest/api/subQuest';
import type { SubQuestLogDTO } from '@/entities/sub-quest/api/dto';

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
      queryClient.invalidateQueries({
        queryKey: ['quest', 'completed-mainquests'],
      });
      queryClient.invalidateQueries({
        queryKey: ['quest', 'statistics'],
      });
      queryClient.invalidateQueries({
        queryKey: ['main-quest', 'user'],
      });
    },
  });
};
