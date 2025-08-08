import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Loading } from '@/components/ui/Loading/Loading';
import { useAuthenticateUser } from '@/api/hooks/auth/useAuthenticateUser';
import { useAuthStore } from '@/stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useGetCurrentUser } from '@/api/hooks/user/useGetCurrentUser';
import { useGetUsersMainQuests } from '@/api/hooks/quest/useGetUsersMainQuests';

export const PrivateLayout = () => {
  const { data: isAuthenticated, isLoading: isAuthLoading } =
    useAuthenticateUser();
  const { data: user } = useGetCurrentUser({
    isAuthenticated: !!isAuthenticated,
  });
  const { data: mainQuestList, isLoading: isQuestLoading } =
    useGetUsersMainQuests({
      isAuthenticated: !!isAuthenticated,
    });
  const location = useLocation();
  const pathname = location.pathname;

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

  if (isAuthLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={PAGE_PATHS.LOGIN} />;
  }

  if (isQuestLoading) {
    return <Loading />;
  }

  if (pathname === PAGE_PATHS.ROOT) {
    const hasActiveQuest = mainQuestList && mainQuestList.length > 0;

    if (!hasActiveQuest) {
      return <Navigate to={PAGE_PATHS.QUEST} replace />;
    }
  }

  return <Outlet />;
};
