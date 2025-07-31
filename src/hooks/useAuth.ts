import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/stores/authStore';
import { getCookie } from '@/utils/cookie';
import { useGetCurrentUser } from '@/api/hooks/auth/useGetCurrentUser';

export const useAuth = () => {
  const { setUser } = useAuthStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setPendingSocialUser: state.setPendingSocialUser,
    }))
  );

  const { data: currentUser, isLoading } = useGetCurrentUser();

  const validateAuth = useCallback(async () => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      setUser(null);

      return;
    }

    if (currentUser) {
      setUser(currentUser.data ?? null);
    }
  }, [setUser, currentUser]);

  return { validateAuth, isLoading };
};
