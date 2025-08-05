import { Navigate, Outlet } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Loading } from '@/components/ui/Loading/Loading';
import { useAuthenticateUser } from '@/api/hooks/auth/useAuthenticateUser';
import { useAuthStore } from '@/stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useGetCurrentUser } from '@/api/hooks/user/useGetCurrentUser';

export const PrivateLayout = () => {
  const { data: isAuthenticated, isLoading } = useAuthenticateUser();
  const { data: user } = useGetCurrentUser({
    isAuthenticated: !!isAuthenticated,
  });

  const { setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    }))
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      setUser(user);
    }
  }, [isAuthenticated, setUser, user]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={PAGE_PATHS.LOGIN} />;
  }

  return <Outlet />;
};
