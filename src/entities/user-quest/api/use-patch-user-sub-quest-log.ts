import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUsersSubQuestLog } from './user-quest';
import type { SubQuestLogDTO } from './user-quest.dto';

export const usePatchUsersSubQuestLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubQuestLogDTO) => patchUsersSubQuestLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['completed-quests'],
      });
    },
  });
};
