import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '@/shared/ui/BottomNavigation/BottomNavigation';

export const BottomNavigationLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  );
};
