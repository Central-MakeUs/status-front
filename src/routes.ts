import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { StatusPage } from '@/pages/status/StatusPage';
import { ChallengePage } from '@/pages/challenge/ChallengePage';
import { HistoryPage } from '@/pages/history/HistoryPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        path: PAGE_PATHS.STATUS,
        Component: StatusPage,
      },
      {
        path: PAGE_PATHS.CHALLENGE,
        Component: ChallengePage,
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
]);
