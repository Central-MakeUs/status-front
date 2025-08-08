import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserMainQuest } from '@/api/quest';
import type { UserMainQuestGiveUpRequestDTO } from '@/api/types/quest';

export const useDeleteUserMainQuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserMainQuestGiveUpRequestDTO) =>
      deleteUserMainQuest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quests', 'me'],
      });
    },
  });
};
