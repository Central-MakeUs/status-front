import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ServerErrorPage } from '@/pages/errors/server-error-page';
import { Loading } from '@/shared/ui/loading/loading';

export const RootLayout = () => {
  return (
    <ErrorBoundary fallback={<ServerErrorPage />}>
      <div className="wrapper">
        <h1 className="sr-only">상태창</h1>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};
