import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';

export const RootLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  /**
   * [TODO] HOME 기준
   * 최초 유저 & 현재 진행 중인 '챌린지'가 없는 유저: [목표&챌린지]화면이 Home(Default)
   * (그외)현재 진행 중인 챌린지가 있는 유저: [상태창]이 Home(Default)
   */
  const isRootPath = pathname === PAGE_PATHS.ROOT;
  const hasActiveChallenge = false;
  const isFirstTimeUser = true;

  if (isRootPath) {
    if (isFirstTimeUser && !hasActiveChallenge) {
      return <Navigate to={PAGE_PATHS.CHALLENGE} replace />;
    } else {
      return <Navigate to={PAGE_PATHS.STATUS} replace />;
    }
  }

  return <Outlet />;
};
