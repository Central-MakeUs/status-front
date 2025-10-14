import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SubQuestLogDTO } from '@/entities/quest/api/dto';
import { patchUserSubQuestLog } from '@/entities/quest/api/quest';

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
