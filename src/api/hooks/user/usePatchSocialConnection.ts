import { connectSocialAccount } from '@/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchSocialConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: connectSocialAccount,
    throwOnError: (error) => {
      if (error instanceof Response && error.status === 400) {
        return false;
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
