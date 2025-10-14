import { withdrawal } from '@/entities/users/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useWithdrawalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawal,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
