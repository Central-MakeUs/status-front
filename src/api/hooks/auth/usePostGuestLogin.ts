import { guestLogin } from '@/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
