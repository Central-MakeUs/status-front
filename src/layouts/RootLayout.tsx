import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { ErrorBoundary } from 'react-error-boundary';
import { ServerErrorPage } from '@/pages/errors/ServerErrorPage';
import { Loading } from '@/components/ui/Loading/Loading';
import { useGetUsersMainQuests } from '@/api/hooks/quest/useGetUsersMainQuests';

export const RootLayout = () => {
  const { data: mainQuestList, isLoading } = useGetUsersMainQuests();
  const location = useLocation();
  const pathname = location.pathname;
  const hasActiveQuest = mainQuestList && mainQuestList.length > 0;

  if (isLoading) {
    return <Loading />;
  }

  if (pathname === PAGE_PATHS.ROOT) {
    if (!hasActiveQuest) {
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
