import { useEffect } from 'react';
import { useSocialAuth } from '@/hooks/useSocialAuth';
import { googleLogin, kakaoLogin } from '@/api/auth';
import { SOCIAL_PROVIDER, URL_SCHEME } from '@/constants/auth';
import type { SocialProvider } from '@/types/auth';

import IconApple from '@/assets/icons/icon-login-apple.svg?react';
import IconGoogle from '@/assets/icons/icon-login-google.svg?react';
import IconKakao from '@/assets/icons/icon-login-kakao.svg?react';

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);

const LoginPage = () => {
  const { loginWith } = useSocialAuth();

  const isWebView = window.ReactNativeWebView !== undefined;

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
  }, [isWebView]);

  const handleAuthCallback = async (code: string, provider: SocialProvider) => {
    try {
      switch (provider) {
        case 'google':
          await googleLogin(code);
          break;
        case 'kakao':
          await kakaoLogin(code);
          break;
        default:
          break;
      }
      // [TODO] Zustand store 업데이트
      // [TODO] 회원가입 or 메인 페이지로 이동
      window.location.href = '/';
    } catch {
      // [TODO] 로그인 실패 처리?
    }
  };

  const handleGoogleLogin = () => {
    loginWith(SOCIAL_PROVIDER.GOOGLE);
  };

  const handleKakaoLogin = () => {
    loginWith(SOCIAL_PROVIDER.KAKAO);
  };

  return (
    <>
      <main className="main">
        <div className={cx('login-container')}>
          <video className={cx('login-animation')} autoPlay muted playsInline>
            <source src="/videos/splash-animation.mp4" type="video/mp4" />
          </video>

          <div className={cx('login-actions')}>
            <button type="button" className={cx('button-login', 'apple')}>
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
