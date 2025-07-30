import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { AUTH_CONFIGS } from '@/constants/auth';
import { useAuthStore } from '@/stores/authStore';
import { getCookie } from '@/utils/cookie';
import { useGetCurrentUser } from '@/api/hooks/auth/useGetCurrentUser';
import { WEB_VIEW_MESSAGE_TYPE } from '@/constants/webView';

import type { SocialProvider } from '@/types/auth';

const createOAuthURL = (provider: SocialProvider, state: string): string => {
  const config = AUTH_CONFIGS[provider];

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: config.responseType,
    state: encodeURIComponent(state),
    ...(config.scope && { scope: config.scope }),
  });

  return `${config.endpoint}?${params.toString()}`;
};

export const useAuth = () => {
  const isWebView = window.ReactNativeWebView !== undefined;

  const { setUser } = useAuthStore(
    useShallow((state) => ({
      setUser: state.setUser,
    }))
  );

  const { data: currentUser, isLoading } = useGetCurrentUser();

  const validateAuth = useCallback(async () => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      setUser(null);

      return;
    }

    if (currentUser) {
      setUser(currentUser.data ?? null);
    }
  }, [setUser, currentUser]);

  const loginWith = useCallback(
    (provider: SocialProvider) => {
      const state = JSON.stringify({
        fromWebView: isWebView,
        provider,
        timestamp: Date.now(),
      });

      const url = createOAuthURL(provider, state);

      if (isWebView && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: WEB_VIEW_MESSAGE_TYPE.OPEN_EXTERNAL_BROWSER,
            url,
          })
        );
      } else {
        window.location.href = url;
      }
    },
    [isWebView]
  );

  return { validateAuth, loginWith, isLoading };
};
