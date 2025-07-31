import { Suspense } from 'react';
import { Navigate, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { ErrorBoundary } from 'react-error-boundary';
import { ServerErrorPage } from '@/pages/errors/ServerErrorPage';
import { Loading } from '@/components/ui/Loading/Loading';
import { useAuthStore } from '@/stores/authStore';
export const RootLayout = () => {
  const userData = useLoaderData();
  const setUser = useAuthStore((state) => state.setUser);
  const location = useLocation();
  const pathname = location.pathname;

  if (userData) {
    setUser(userData.data);
  }

  /**
   * [TODO] HOME 기준
   * 최초 유저 & 현재 진행 중인 '퀘스트'가 없는 유저: [퀘스트]화면이 Home(Default)
   * (그외)현재 진행 중인 퀘스트가 있는 유저: [상태창]이 Home(Default)
   */
  const isRootPath = pathname === PAGE_PATHS.ROOT;
  const hasActiveQuest = false;
  const isFirstTimeUser = true;

  if (isRootPath) {
    if (isFirstTimeUser && !hasActiveQuest) {
      return <Navigate to={PAGE_PATHS.QUEST} replace />;
    } else {
      return <Navigate to={PAGE_PATHS.STATUS} replace />;
    }
  }

  return (
    <ErrorBoundary fallback={<ServerErrorPage />}>
      <div className="wrapper">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};
