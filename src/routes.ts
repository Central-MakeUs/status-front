import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { RootLayout } from '@/layouts/RootLayout';
import { BottomNavigationLayout } from '@/layouts/BottomNavigationLayout';
import { PrivateLayout } from '@/layouts/PrivateLayout';

const StatusPage = lazy(() => import('@/pages/status/StatusPage'));
const QuestPage = lazy(() => import('@/pages/quest/QuestPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));
const HistoryPage = lazy(() => import('@/pages/history/HistoryPage'));
const StepAttributePage = lazy(
  () => import('@/pages/quest/new/StepAttributePage')
);
const StepCategoryPage = lazy(
  () => import('@/pages/quest/new/StepCategoryPage')
);
const StepMainQuestPage = lazy(
  () => import('@/pages/quest/new/StepMainQuestPage')
);
const StepSubQuestPage = lazy(
  () => import('@/pages/quest/new/StepSubQuestPage')
);
const StepSchedulePage = lazy(
  () => import('@/pages/quest/new/StepSchedulePage')
);
const StepResultPage = lazy(() => import('@/pages/quest/new/StepResultPage'));
const QuestDetailPage = lazy(
  () => import('@/pages/quest/detail/QuestDetailPage')
);
const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const TutorialPage = lazy(() => import('@/pages/tutorial/TutorialPage'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));
const SignUpPage = lazy(() => import('@/pages/sign-up/SignUpPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        Component: PrivateLayout,
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
              {
                path: PAGE_PATHS.QUEST_DETAIL,
                Component: QuestDetailPage,
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
            path: PAGE_PATHS.QUEST_NEW_MAIN_QUEST,
            Component: StepMainQuestPage,
          },
          {
            path: PAGE_PATHS.QUEST_NEW_SUB_QUEST,
            Component: StepSubQuestPage,
          },
          {
            path: PAGE_PATHS.QUEST_NEW_SCHEDULE,
            Component: StepSchedulePage,
          },
          {
            path: PAGE_PATHS.QUEST_NEW_RESULT,
            Component: StepResultPage,
          },
          {
            path: PAGE_PATHS.TUTORIAL,
            Component: TutorialPage,
          },
        ],
      },
      {
        path: PAGE_PATHS.SIGN_UP,
        Component: SignUpPage,
      },
      {
        path: PAGE_PATHS.LOGIN,
        Component: LoginPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
