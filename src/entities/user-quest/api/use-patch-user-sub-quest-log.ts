import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUsersSubQuestLog } from '@/shared/api/user-quest';
import type { SubQuestLogDTO } from '@/shared/api/user-quest.dto';

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
