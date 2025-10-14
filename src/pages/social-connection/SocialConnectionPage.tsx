import { Header } from '@/shared/ui/Header/Header';
import { useSocialAuth } from '@/features/auth/model/useSocialAuth';
import { Loading } from '@/shared/ui/Loading/Loading';

import { SOCIAL_PROVIDER } from '@/features/auth/config/constants';

import IconIntroduction from '@/assets/icons/icon-character-introduction.svg?react';
import IconKakao from '@/assets/icons/icon-login-kakao.svg?react';
import IconGoogle from '@/assets/icons/icon-login-google.svg?react';
import IconApple from '@/assets/icons/icon-login-apple.svg?react';

import classNames from 'classnames/bind';
import styles from './SocialConnectionPage.module.scss';

const cx = classNames.bind(styles);

const SocialConnectionPage = () => {
  const { signInWithOAuth, isSocialLoginLoading } = useSocialAuth();

  const handleGoogleLogin = () => {
    signInWithOAuth(SOCIAL_PROVIDER.GOOGLE, true);
  };

  const handleKakaoLogin = () => {
    signInWithOAuth(SOCIAL_PROVIDER.KAKAO, true);
  };

  const handleAppleLogin = async () => {
    signInWithOAuth(SOCIAL_PROVIDER.APPLE, true);
  };

  return (
    <>
      <Header>
        <Header.Title>계정 연동</Header.Title>
        <Header.BackButton />
      </Header>
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
          </div>
        </div>
      </main>
      {isSocialLoginLoading && <Loading />}
    </>
  );
};

export default SocialConnectionPage;
