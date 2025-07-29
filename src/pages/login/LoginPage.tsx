import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocialAuth } from '@/hooks/useSocialAuth';
import { useAuthStore } from '@/stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { googleLogin, kakaoLogin } from '@/api/auth';
import { SOCIAL_PROVIDER, URL_SCHEME, USER_TYPE } from '@/constants/auth';
import { PAGE_PATHS } from '@/constants/pagePaths';
import type { OAuthProvider, SocialProvider } from '@/types/auth';
import type { OAuthLoginRequestDTO } from '@/api/types/auth';
import type { BasicUsers } from '@/types/users';

import IconApple from '@/assets/icons/icon-login-apple.svg?react';
import IconGoogle from '@/assets/icons/icon-login-google.svg?react';
import IconKakao from '@/assets/icons/icon-login-kakao.svg?react';

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWith } = useSocialAuth();
  const { setPendingSocialUser, setUser, setIsAuthenticated } = useAuthStore(
    useShallow((state) => ({
      setPendingSocialUser: state.setPendingSocialUser,
      setUser: state.setUser,
      setIsAuthenticated: state.setIsAuthenticated,
    }))
  );

  const isWebView = window.ReactNativeWebView !== undefined;

  useEffect(() => {
    const handleAuthCallback = async (
      code: string,
      provider: SocialProvider
    ) => {
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
          setIsAuthenticated(true);
          // [TODO] 인증 만료 후 로그인 페이지 접근 시 기존 페이지로 리다이렉트 처리
          navigate(PAGE_PATHS.ROOT);
        }
      } catch {
        // [TODO] 로그인 실패 처리?
      }
    };

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
        window.location.href = `${URL_SCHEME}?code=${encodeURIComponent(code)}&provider=${parsedState.provider}`;
      } else {
        handleAuthCallback(code, parsedState.provider);
      }
      return;
    }

    const handleAuthResult = (event: MessageEvent) => {
      const { type, data } = JSON.parse(event.data);

      if (type === 'AUTH_SUCCESS') {
        handleAuthCallback(data.code, data.provider);
      } else if (type === 'AUTH_ERROR') {
        // [TODO] 인증 실패 처리?
      }
    };

    if (isWebView) {
      window.addEventListener('message', handleAuthResult);
      return () => window.removeEventListener('message', handleAuthResult);
    }
  }, [isWebView, navigate, setPendingSocialUser, setUser, setIsAuthenticated]);

  const handleGoogleLogin = () => {
    loginWith(SOCIAL_PROVIDER.GOOGLE);
  };

  const handleKakaoLogin = () => {
    loginWith(SOCIAL_PROVIDER.KAKAO);
  };

  const handleAppleLogin = async () => {
    loginWith(SOCIAL_PROVIDER.APPLE);
  };

  return (
    <>
      <main className="main">
        <div className={cx('login-container')}>
          <video className={cx('login-animation')} autoPlay muted playsInline>
            <source src="/videos/splash-animation.mp4" type="video/mp4" />
          </video>

          <div className={cx('login-actions')}>
            <button
              type="button"
              id="appleid-signin"
              className={cx('button-login', 'apple')}
              onClick={handleAppleLogin}
            >
              <IconApple className={cx('login-icon')} aria-hidden="true" />
              <span className={cx('login-text')}>Apple로 시작</span>
            </button>
            <button
              type="button"
              className={cx('button-login', 'google')}
              onClick={handleGoogleLogin}
            >
              <IconGoogle className={cx('login-icon')} aria-hidden="true" />
              <span className={cx('login-text')}>Google로 시작</span>
            </button>
            <button
              type="button"
              className={cx('button-login', 'kakao')}
              onClick={handleKakaoLogin}
            >
              <IconKakao className={cx('login-icon')} aria-hidden="true" />
              <span className={cx('login-text')}>Kakao로 시작</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
