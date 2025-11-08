import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import { PAGE_PATHS } from '@/shared/config/paths';
import { useAuthStore } from '../model/auth-store';
import { withdrawal } from './auth';
export const usePostWithdrawalMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = useAuthStore(
    useShallow((state) => ({
      setUser: state.setUser,
    }))
  );

  return useMutation({
    mutationFn: withdrawal,
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
    },
    onSettled: () => {
      navigate(PAGE_PATHS.ROOT);
    },
  });
};
