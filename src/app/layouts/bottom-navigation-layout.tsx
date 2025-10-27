import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '@/widgets/bottom-navigation/ui/bottom-navigation';

export const BottomNavigationLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  );
};
