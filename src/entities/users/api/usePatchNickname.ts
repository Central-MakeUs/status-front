import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNickname } from './users';

export const usePatchNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
