import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SubQuestLogDTO } from '@/api/types/quest';
import { patchUserSubQuestLog } from '@/api/quest';

export const usePatchUserSubQuestLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubQuestLogDTO) => patchUserSubQuestLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['completed-quests'],
      });
    },
  });
};
