import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/stores/authStore';
import { SOCIAL_PROVIDER } from '@/constants/auth';
import type { BasicUsersDTO } from '@/api/types/users';
import { usePostGuestLogin } from '@/api/hooks/auth/usePostGuestLogin';
import { PAGE_PATHS } from '@/constants/pagePaths';

import IconApple from '@/assets/icons/icon-login-apple.svg?react';
import IconGoogle from '@/assets/icons/icon-login-google.svg?react';
import IconKakao from '@/assets/icons/icon-login-kakao.svg?react';
import IconIntroduction from '@/assets/icons/icon-character-introduction.svg?react';

import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';
import { useSocialAuth } from '@/hooks/useSocialAuth';

const cx = classNames.bind(styles);

const SignInPage = () => {
  const navigate = useNavigate();
  const { signInWithOAuth } = useSocialAuth();
  const { setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    }))
  );
  const guestLogin = usePostGuestLogin();

  const handleGoogleLogin = () => {
    signInWithOAuth(SOCIAL_PROVIDER.GOOGLE);
  };

  const handleKakaoLogin = () => {
    signInWithOAuth(SOCIAL_PROVIDER.KAKAO);
  };

  const handleAppleLogin = async () => {
    signInWithOAuth(SOCIAL_PROVIDER.APPLE);
  };

  const handleGuestLogin = () => {
    guestLogin.mutate(undefined, {
      onSuccess: (data) => {
        setUser(data as BasicUsersDTO);
      },
      onSettled: () => {
        navigate(PAGE_PATHS.TUTORIAL);
      },
    });
  };

  return (
    <>
      <main className="main">
        <div className={cx('login-container')}>
          <IconIntroduction
            className={cx('login-introduction')}
            aria-hidden="true"
          />

          <div className={cx('login-actions')}>
            <button
              type="button"
              className={cx('button-login', 'kakao')}
              onClick={handleKakaoLogin}
            >
              <IconKakao className={cx('login-icon')} aria-hidden="true" />
              <span className={cx('login-text')}>Kakao로 시작</span>
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
              id="appleid-signin"
              className={cx('button-login', 'apple')}
              onClick={handleAppleLogin}
            >
              <IconApple className={cx('login-icon')} aria-hidden="true" />
              <span className={cx('login-text')}>Apple로 시작</span>
            </button>
            <button
              type="button"
              className={cx('button-login', 'guest')}
              onClick={handleGuestLogin}
            >
              <span className={cx('login-text')}>게스트로 시작</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignInPage;
