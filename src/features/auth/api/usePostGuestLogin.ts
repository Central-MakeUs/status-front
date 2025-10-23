import { useMutation, useQueryClient } from '@tanstack/react-query';
import { guestLogin } from './auth';

export const usePostGuestLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: guestLogin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      await queryClient.refetchQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
