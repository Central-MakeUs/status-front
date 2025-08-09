import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserSubQuestLogRequestDTO } from '@/api/types/quest';
import { patchUserSubQuestLog } from '@/api/quest';

export const usePatchUserSubQuestLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserSubQuestLogRequestDTO) => patchUserSubQuestLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['completed-quests'],
      });
    },
  });
};
