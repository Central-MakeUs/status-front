import { signUp } from '@/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
