import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SubQuestLogDTO } from '@/entities/sub-quest/api/dto';
import { patchUserSubQuestLog } from '@/entities/sub-quest/api/subQuest';

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
