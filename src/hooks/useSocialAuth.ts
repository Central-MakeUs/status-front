import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AUTH_CONFIGS, SOCIAL_PROVIDER, URL_SCHEME } from '@/constants/auth';
import { MESSAGE_TYPES } from '@/constants/webView';
import { googleLogin, kakaoLogin } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { USER_TYPE } from '@/constants/auth';

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
    (provider: SocialProvider) => {
      const state = JSON.stringify({
        fromWebView: isWebView,
        provider,
        timestamp: Date.now(),
        redirect: redirect,
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
    async (code: string, provider: SocialProvider, redirect: string | null) => {
      try {
        const requestDTO: OAuthLoginRequestDTO = {
          provider,
          code,
        };

        let response;

        switch (provider) {
          case SOCIAL_PROVIDER.GOOGLE:
            response = await googleLogin(requestDTO);
            break;
          case SOCIAL_PROVIDER.KAKAO:
            response = await kakaoLogin(requestDTO);
            break;
          // [TODO] 애플 로그인 id_token 받아오는 로직 추가 필요.
          default:
            break;
        }

        if (!response?.data) {
          return;
        }

        if (response.data.type === USER_TYPE.SIGN_UP) {
          setPendingSocialUser(response.data as OAuthProvider);
          navigate(PAGE_PATHS.SIGN_UP);
        } else {
          setUser(response.data as BasicUsers);
          if (redirect) {
            navigate(decodeURIComponent(redirect));
          } else {
            navigate(PAGE_PATHS.ROOT);
          }
        }
      } catch {
        // [TODO] 로그인 실패 처리?
      }
    },
    [setPendingSocialUser, setUser, navigate]
  );

  const handleWebViewMessage = useCallback(
    (event: MessageEvent) => {
      const { type, data } = JSON.parse(event.data);

      if (type === MESSAGE_TYPES.AUTH_SUCCESS) {
        handleOAuthCallback(data.code, data.provider, data.redirect);
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
        window.location.href = `${URL_SCHEME}?code=${encodeURIComponent(code)}&provider=${parsedState.provider}&redirect=${parsedState.redirect || ''}`;
      } else {
        handleOAuthCallback(code, parsedState.provider, parsedState.redirect);
      }
    }

    if (isWebView) {
      window.addEventListener('message', handleWebViewMessage);
      return () => window.removeEventListener('message', handleWebViewMessage);
    }
  }, [isWebView, handleWebViewMessage, handleOAuthCallback]);

  return { signInWithOAuth };
};
