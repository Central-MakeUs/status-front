import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUsersMainQuest } from './usersMainQuest';

export const useDeleteUsersMainQuest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUsersMainQuest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quest', 'me'],
      });
    },
  });
};
