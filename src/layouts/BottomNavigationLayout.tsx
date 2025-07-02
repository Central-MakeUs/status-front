import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '@/components/ui/BottomNavigation/BottomNavigation';

export const BottomNavigationLayout = () => {
  return (
    <div className="wrapper">
      <div style={{ paddingBottom: '100px' }}>
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
};
