import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUsersSubQuestLog } from './user-quest';
import type { SubQuestLogDTO } from './user-quest.dto';

export const usePostUsersSubQuestLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubQuestLogDTO) => postUsersSubQuestLog(data),
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
