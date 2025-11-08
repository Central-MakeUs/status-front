import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../model/auth-store';
import { PAGE_PATHS } from '@/shared/config/paths';
import { logout } from './auth';

export const usePostLogout = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore(
    useShallow((state) => ({
      setUser: state.setUser,
    }))
  );
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      setUser(null);
    },
    onSettled: () => {
      navigate(PAGE_PATHS.ROOT);
    },
  });
};
