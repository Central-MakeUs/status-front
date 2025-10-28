import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNickname } from '@/shared/api/user';

export const usePatchNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
