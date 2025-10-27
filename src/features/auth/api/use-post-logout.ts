import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from './auth';

export const usePostLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
