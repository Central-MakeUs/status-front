import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '@/components/ui/BottomNavigation/BottomNavigation';

export const BottomNavigationLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  );
};
