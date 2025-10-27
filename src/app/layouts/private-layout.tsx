import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '@/shared/config/paths';
import { Loading } from '@/shared/ui/loading/loading';
import { useAuthenticateUser } from '@/features/auth/api/use-authenticate-user';
import { useAuthStore } from '@/features/auth/model/auth-store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { useGetCurrentUser } from '@/entities/user/api/use-get-current-user';
import { useGetUsersMainQuests } from '@/entities/user-quest/api/use-get-user-main-quests';

export const PrivateLayout = () => {
  const {
    data: isAuthenticated,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useAuthenticateUser();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetCurrentUser({
    isAuthenticated: !!isAuthenticated,
  });
  const {
    data: mainQuestList,
    isLoading: isQuestLoading,
    isError: isQuestError,
  } = useGetUsersMainQuests({
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

  if (isAuthError) {
    return <Navigate to={PAGE_PATHS.LOGIN} replace />;
  }

  if (!isAuthLoading && !isAuthenticated) {
    return <Navigate to={PAGE_PATHS.LOGIN} replace />;
  }

  if (isQuestLoading || isUserLoading) {
    return <Loading />;
  }

  if (isUserError || isQuestError) {
    return <Navigate to={PAGE_PATHS.QUEST_NEW_ERROR} replace />;
  }

  if (pathname === PAGE_PATHS.ROOT) {
    const hasActiveQuest = mainQuestList && mainQuestList.length > 0;

    if (!hasActiveQuest) {
      return <Navigate to={PAGE_PATHS.QUEST} replace />;
    }
  }

  return <Outlet />;
};
