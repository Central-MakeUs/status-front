import { updateNickname } from '@/entities/users/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
