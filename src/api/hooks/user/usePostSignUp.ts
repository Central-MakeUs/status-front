import { signUp } from '@/entities/users/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      await queryClient.refetchQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
