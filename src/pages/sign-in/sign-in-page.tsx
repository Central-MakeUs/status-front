import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/features/auth/model/auth-store';
import { SOCIAL_PROVIDER } from '@/features/auth/config/constants';
import { usePostGuestLogin } from '@/features/auth/api/use-post-guest-login';
import { PAGE_PATHS } from '@/shared/config/paths';
import { useSocialAuth } from '@/features/auth/model/use-social-auth';
import { Loading } from '@/shared/ui/loading/loading';
import { Button } from '@/shared/ui/button/button';

import type { BasicUsersDTO } from '@/shared/api/user.dto';

import IconApple from '@/assets/icons/icon-login-apple.svg?react';
import IconGoogle from '@/assets/icons/icon-login-google.svg?react';
import IconKakao from '@/assets/icons/icon-login-kakao.svg?react';
import IconIntroduction from '@/assets/icons/icon-character-introduction.svg?react';

import classNames from 'classnames/bind';
import styles from './sign-in-page.module.scss';

const cx = classNames.bind(styles);

const SignInPage = () => {
  const navigate = useNavigate();
  const { signInWithOAuth, isSocialLoginLoading } = useSocialAuth();
  const { setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    }))
  );
  const { mutate: guestLogin, isPending: isGuestLoginLoading } =
    usePostGuestLogin();

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
    guestLogin(undefined, {
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
              className={cx('button-login', 'apple')}
              onClick={handleAppleLogin}
            >
              <IconApple className={cx('login-icon')} aria-hidden="true" />
              <span className={cx('login-text')}>Apple로 시작</span>
            </button>
            <Button
              variant="secondary"
              className={cx('button-guest')}
              onClick={handleGuestLogin}
            >
              게스트로 시작
            </Button>
          </div>
        </div>
      </main>
      {(isGuestLoginLoading || isSocialLoginLoading) && <Loading />}
    </>
  );
};

export default SignInPage;
