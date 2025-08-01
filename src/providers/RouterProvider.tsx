import { lazy } from 'react';
import {
  RouterProvider as Provider,
  createBrowserRouter,
} from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { RootLayout } from '@/layouts/RootLayout';
import { BottomNavigationLayout } from '@/layouts/BottomNavigationLayout';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { getCookie } from '@/utils/cookie';
import { queryClient } from '@/lib/queryClient';
import { getCurrentUser } from '@/api/users';
import { Loading } from '@/components/ui/Loading/Loading';

const StatusPage = lazy(() => import('@/pages/status/StatusPage'));
const QuestPage = lazy(() => import('@/pages/quest/QuestPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));
const HistoryPage = lazy(() => import('@/pages/history/HistoryPage'));
const StepAttributePage = lazy(
  () => import('@/pages/quest/new/StepAttributePage')
);
const StepThemePage = lazy(() => import('@/pages/quest/new/StepThemePage'));
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
const SignInPage = lazy(() => import('@/pages/sign-in/SignInPage'));
const TutorialPage = lazy(() => import('@/pages/tutorial/TutorialPage'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));
const SignUpPage = lazy(() => import('@/pages/sign-up/SignUpPage'));

async function authLoader() {
  const accessToken = getCookie('access_token');

  if (!accessToken) {
    return null;
  }

  return await queryClient.fetchQuery({
    queryKey: ['users', 'me'],
    queryFn: getCurrentUser,
  });
}

export default function RouterProvider() {
  const router = createBrowserRouter([
    {
      path: '/',
      Component: RootLayout,
      loader: authLoader,
      hydrateFallbackElement: <Loading />,
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
          ],
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
