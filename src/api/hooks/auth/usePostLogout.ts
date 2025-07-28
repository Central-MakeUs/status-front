import { logout } from '@/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
