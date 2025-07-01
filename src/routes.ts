import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { BottomNavigationLayout } from './layouts/BottomNavigationLayout';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { StatusPage } from '@/pages/status/StatusPage';
import { QuestPage } from '@/pages/quest/QuestPage';
import { HistoryPage } from '@/pages/history/HistoryPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        path: '/',
        Component: BottomNavigationLayout,
        children: [
          {
            path: PAGE_PATHS.STATUS,
            Component: StatusPage,
          },
          {
            path: PAGE_PATHS.QUEST,
            Component: QuestPage,
          },
          {
            path: PAGE_PATHS.HISTORY,
            Component: HistoryPage,
          },
          {
            path: PAGE_PATHS.PROFILE,
            Component: ProfilePage,
          },
        ],
      },
    ],
  },
]);
