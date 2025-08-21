import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AUTH_CONFIGS, PROVIDER_TYPE, URL_SCHEME } from '@/constants/auth';
import { MESSAGE_TYPES } from '@/constants/webView';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { USER_TYPE } from '@/constants/auth';
import { usePostSocialLogin } from '@/api/hooks/auth/usePostSocialLogin';
import { useGetCurrentUser } from '@/api/hooks/user/useGetCurrentUser';
import { useAuthenticateUser } from '@/api/hooks/auth/useAuthenticateUser';

import type { SocialProvider } from '@/types/auth';
import type { OAuthProvider } from '@/types/auth';
import type { OAuthLoginRequestDTO } from '@/api/types/auth';
import type { BasicUsers } from '@/types/users';

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

export const useSocialAuth = () => {
  const queryClient = useQueryClient();
  const { mutate: socialLogin, isPending: isSocialLoginLoading } =
    usePostSocialLogin();
  const { data: isAuthenticated } = useAuthenticateUser();
  const { data: currentUser, refetch: refetchCurrentUser } = useGetCurrentUser({
    isAuthenticated: !!isAuthenticated,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  const { setUser, setPendingSocialUser } = useAuthStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setPendingSocialUser: state.setPendingSocialUser,
    }))
  );

  const isWebView = window.ReactNativeWebView !== undefined;

  const signInWithOAuth = useCallback(
    async (provider: SocialProvider, socialConnection: boolean = false) => {
      const state = JSON.stringify({
        fromWebView: isWebView,
        provider,
        timestamp: Date.now(),
        redirect: redirect,
        connection: socialConnection,
      });

      const url = createOAuthURL(provider, state);

      if (isWebView && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: MESSAGE_TYPES.OPEN_EXTERNAL_BROWSER,
            url,
          })
        );
      } else {
        window.location.href = url;
      }
    },
    [isWebView, redirect]
  );

  const handleOAuthCallback = useCallback(
    async (
      code: string,
      provider: SocialProvider,
      redirect: string | null,
      connection: boolean = false
    ) => {
      const payload: OAuthLoginRequestDTO = {
        provider,
        code,
      };

      if (connection) {
        await refetchCurrentUser();

        if (currentUser?.providerType !== PROVIDER_TYPE.GUEST) {
          return;
        }

        navigate(PAGE_PATHS.SIGN_UP, {
          state: {
            payload,
            nickname: currentUser?.nickname,
          },
        });

        return;
      }

      socialLogin(payload, {
        onSuccess: async (response) => {
          if (!response?.data) {
            return;
          }

          if (response.data.type === USER_TYPE.SIGN_UP) {
            setPendingSocialUser(response.data as OAuthProvider);
            navigate(PAGE_PATHS.SIGN_UP);
          } else {
            await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
            setUser(response.data as BasicUsers);

            if (redirect) {
              navigate(decodeURIComponent(redirect));
            } else {
              navigate(PAGE_PATHS.ROOT);
            }
          }
        },
      });
    },
    [
      setPendingSocialUser,
      setUser,
      navigate,
      currentUser,
      queryClient,
      socialLogin,
      refetchCurrentUser,
    ]
  );

  const handleWebViewMessage = useCallback(
    (event: MessageEvent) => {
      const { type, data } = JSON.parse(event.data);

      if (type === MESSAGE_TYPES.AUTH_SUCCESS) {
        handleOAuthCallback(
          data.code,
          data.provider,
          data.redirect,
          data.connection
        );
      } else if (type === MESSAGE_TYPES.AUTH_ERROR) {
        // [TODO] 인증 실패 처리?
      }
    },
    [handleOAuthCallback]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const stateParam = params.get('state');
    const parsedState = JSON.parse(decodeURIComponent(stateParam || '{}'));

    if (error) {
      if (parsedState?.fromWebView) {
        window.location.href = `${URL_SCHEME}?error=${encodeURIComponent(error)}`;
      }
      return;
    }

    if (code) {
      if (parsedState?.fromWebView) {
        window.location.href = `${URL_SCHEME}?code=${encodeURIComponent(code)}&provider=${parsedState.provider}&redirect=${parsedState.redirect || ''}&connection=${parsedState.connection || ''}`;
      } else {
        handleOAuthCallback(
          code,
          parsedState.provider,
          parsedState.redirect,
          parsedState.connection
        );
      }
    }
  }, [handleOAuthCallback]);

  useEffect(() => {
    if (!isWebView) {
      return;
    }

    window.addEventListener('message', handleWebViewMessage);
    document.addEventListener('message', handleWebViewMessage as EventListener);
    return () => {
      window.removeEventListener('message', handleWebViewMessage);
      document.removeEventListener(
        'message',
        handleWebViewMessage as EventListener
      );
    };
  }, [isWebView, handleWebViewMessage, handleOAuthCallback]);

  return { signInWithOAuth, isSocialLoginLoading };
};
