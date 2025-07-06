import { createBrowserRouter } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { RootLayout } from '@/layouts/RootLayout';
import { BottomNavigationLayout } from '@/layouts/BottomNavigationLayout';
import { StatusPage } from '@/pages/status/StatusPage';
import { QuestPage } from '@/pages/quest/QuestPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { HistoryPage } from '@/pages/history/HistoryPage';
import {
  StepAttributePage,
  StepCategoryPage,
  StepMainQuestPage,
} from '@/pages/quest/new';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
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
      {
        path: PAGE_PATHS.QUEST_NEW_ATTRIBUTE,
        Component: StepAttributePage,
      },
      {
        path: PAGE_PATHS.QUEST_NEW_CATEGORY,
        Component: StepCategoryPage,
      },
      {
        path: PAGE_PATHS.QUEST_NEW_MAIN_QUESTION,
        Component: StepMainQuestPage,
      },
    ],
  },
]);
