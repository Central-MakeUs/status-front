import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserMainQuest } from '@/entities/main-quest/api/mainQuest';

export const useDeleteUserMainQuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUserMainQuest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quest', 'me'],
      });
    },
  });
};
