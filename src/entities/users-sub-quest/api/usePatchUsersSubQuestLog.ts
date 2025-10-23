import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUsersSubQuestLog } from './usersSubQuest';
import type { SubQuestLogDTO } from './dto';

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
