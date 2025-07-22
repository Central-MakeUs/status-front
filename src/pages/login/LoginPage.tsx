import { useEffect } from 'react';
import {
  GOOGLE_ENDPOINT,
  GOOGLE_SCOPES,
  GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URI,
  GOOGLE_RESPONSE_TYPE,
  URL_SCHEME,
} from '@/constants/auth';

import IconApple from '@/assets/icons/icon-login-apple.svg?react';
import IconGoogle from '@/assets/icons/icon-login-google.svg?react';
import IconKakao from '@/assets/icons/icon-login-kakao.svg?react';

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { googleLogin } from '@/api/auth';
import type { SocialProvider } from '@/api/types/auth';

const cx = classNames.bind(styles);

const LoginPage = () => {
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
        window.location.href = `${URL_SCHEME}?code=${encodeURIComponent(code)}&provider=google`;
      } else {
        handleAuthCallback(code, 'google');
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
    const state = JSON.stringify({ fromWebView: isWebView });

    const url = `${GOOGLE_ENDPOINT}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=${GOOGLE_RESPONSE_TYPE}&scope=${GOOGLE_SCOPES.EMAIL}&state=${encodeURIComponent(state)}`;

    if (isWebView && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'OPEN_EXTERNAL_BROWSER',
          url: url,
        })
      );
    } else {
      window.location.href = url;
    }
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
            <button type="button" className={cx('button-login', 'kakao')}>
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
