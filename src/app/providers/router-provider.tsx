import { lazy } from 'react';
import {
  RouterProvider as Provider,
  createBrowserRouter,
} from 'react-router-dom';
import { PAGE_PATHS } from '@/shared/config/paths';
import { RootLayout } from '@/app/layouts/root-layout';
import { BottomNavigationLayout } from '@/app/layouts/bottom-navigation-layout';
import { PrivateLayout } from '@/app/layouts/private-layout';

const StatusPage = lazy(() => import('@/pages/status/status-page'));
const QuestPage = lazy(() => import('@/pages/quest/quest-page'));
const ProfilePage = lazy(() => import('@/pages/profile/profile-page'));
const HistoryPage = lazy(() => import('@/pages/history/history-page'));
const HistoryDetailPage = lazy(
  () => import('@/pages/history-detail/history-detail-page')
);
const StepAttributePage = lazy(
  () => import('@/pages/quest-creation/step-attribute-page')
);
const StepThemePage = lazy(
  () => import('@/pages/quest-creation/step-theme-page')
);
const StepMainQuestPage = lazy(
  () => import('@/pages/quest-creation/step-main-quest-page')
);
const StepSubQuestPage = lazy(
  () => import('@/pages/quest-creation/step-sub-quest-page')
);
const StepSchedulePage = lazy(
  () => import('@/pages/quest-creation/step-schedule-page')
);
const StepResultPage = lazy(
  () => import('@/pages/quest-creation/step-result-page')
);
const QuestDetailPage = lazy(
  () => import('@/pages/quest-detail/quest-detail-page')
);
const SignInPage = lazy(() => import('@/pages/sign-in/sign-in-page'));
const TutorialPage = lazy(() => import('@/pages/tutorial/tutorial-page'));
const QuestCreationErrorPage = lazy(
  () => import('@/pages/errors/quest-creation-error-page')
);
const NotFoundPage = lazy(() => import('@/pages/errors/not-found-page'));
const SignUpPage = lazy(() => import('@/pages/sign-up/sign-up-page'));
const SocialConnectionPage = lazy(
  () => import('@/pages/social-connection/social-connection-page')
);

export default function RouterProvider() {
  const router = createBrowserRouter([
    {
      path: PAGE_PATHS.ROOT,
      Component: RootLayout,
      children: [
        {
          Component: PrivateLayout,
          children: [
            {
              Component: BottomNavigationLayout,
              children: [
                {
                  index: true,
                  Component: StatusPage,
                },
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
                {
                  path: PAGE_PATHS.HISTORY_DETAIL,
                  Component: HistoryDetailPage,
                },
              ],
            },
            {
              path: PAGE_PATHS.QUEST_NEW_ATTRIBUTE,
              Component: StepAttributePage,
            },
            {
              path: PAGE_PATHS.QUEST_NEW_THEME,
              Component: StepThemePage,
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
            {
              path: PAGE_PATHS.SOCIAL_CONNECTION,
              Component: SocialConnectionPage,
            },
          ],
        },
        {
          path: PAGE_PATHS.QUEST_NEW_ERROR,
          Component: QuestCreationErrorPage,
        },
        {
          path: PAGE_PATHS.SIGN_UP,
          Component: SignUpPage,
        },
        {
          path: PAGE_PATHS.LOGIN,
          Component: SignInPage,
        },
        {
          path: '*',
          Component: NotFoundPage,
        },
      ],
    },
  ]);

  return <Provider router={router} />;
}
