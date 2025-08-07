import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ServerErrorPage } from '@/pages/errors/ServerErrorPage';
import { Loading } from '@/components/ui/Loading/Loading';

export const RootLayout = () => {
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
