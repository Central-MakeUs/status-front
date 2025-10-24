import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '@/widgets/bottom-navigation/ui/BottomNavigation';

export const BottomNavigationLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  );
};
