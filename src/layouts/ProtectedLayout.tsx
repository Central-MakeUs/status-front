import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { PAGE_PATHS } from '@/constants/pagePaths';

export const ProtectedLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={PAGE_PATHS.LOGIN} />;
  }

  return <Outlet />;
};
