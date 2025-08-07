import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUserGiveUpMainQuest } from '@/api/quest';
import type { UserMainQuestGiveUpRequestDTO } from '@/api/types/quest';

export const usePostUserGiveUpMainQuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserMainQuestGiveUpRequestDTO) =>
      postUserGiveUpMainQuest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quest', 'me'],
      });
    },
  });
};
