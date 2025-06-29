import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { MAIN_PAGE_PATHS, PAGE_PATHS } from '@/constants/pagePaths';
import { BottomNavigation } from '@/components/ui/BottomNavigation/BottomNavigation';

import classNames from 'classnames/bind';
import styles from './RootLayout.module.scss';

const cx = classNames.bind(styles);

export const RootLayout: React.FC = () => {
  const location = useLocation();

  /**
   * [TODO] HOME 기준
   * 최초 유저 & 현재 진행 중인 '챌린지'가 없는 유저: [목표&챌린지]화면이 Home(Default)
   * (그외)현재 진행 중인 챌린지가 있는 유저: [상태창]이 Home(Default)
   */
  const isRootPath = location.pathname === '/';
  const hasActiveChallenge = false;
  const isFirstTimeUser = true;

  if (isRootPath && isFirstTimeUser && !hasActiveChallenge) {
    return <Navigate to={PAGE_PATHS.CHALLENGE} replace />;
  }

  const shouldShowBottomNavigation = MAIN_PAGE_PATHS.some(
    (path) => path === location.pathname
  );

  return (
    <div className={cx('wrapper')}>
      <main className={cx('main')}>
        <Outlet />
      </main>
      {shouldShowBottomNavigation && <BottomNavigation />}
    </div>
  );
};
