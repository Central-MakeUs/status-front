import { useCallback } from 'react';
import { AUTH_CONFIGS } from '@/constants/auth';
import type { SocialProvider } from '@/types/auth';

export const createOAuthURL = (
  provider: SocialProvider,
  state: string
): string => {
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

export const useSocialAuth = () => {
  const isWebView = window.ReactNativeWebView !== undefined;

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
            type: 'OPEN_EXTERNAL_BROWSER',
            url,
          })
        );
      } else {
        window.location.href = url;
      }
    },
    [isWebView]
  );

  return { loginWith };
};
