import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { SOCIAL_PROVIDER } from '@/constants/auth';
import { PAGE_PATHS } from '@/constants/pagePaths';

import IconApple from '@/assets/icons/icon-login-apple.svg?react';
import IconGoogle from '@/assets/icons/icon-login-google.svg?react';
import IconKakao from '@/assets/icons/icon-login-kakao.svg?react';

import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';
import { useSocialAuth } from '@/hooks/useSocialAuth';

const cx = classNames.bind(styles);

const SignInPage = () => {
  const { signInWithOAuth } = useSocialAuth();
  const user = useAuthStore((state) => state.user);

  const handleGoogleLogin = () => {
    signInWithOAuth(SOCIAL_PROVIDER.GOOGLE);
  };

  const handleKakaoLogin = () => {
    signInWithOAuth(SOCIAL_PROVIDER.KAKAO);
  };

  const handleAppleLogin = async () => {
    signInWithOAuth(SOCIAL_PROVIDER.APPLE);
  };

  if (user) {
    return <Navigate to={PAGE_PATHS.ROOT} />;
  }

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

export default SignInPage;
