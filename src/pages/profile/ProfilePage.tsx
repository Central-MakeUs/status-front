import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useShallow } from 'zustand/react/shallow';
import { Header } from '@/shared/ui/Header/Header';
import { useAuthStore } from '@/features/auth/model/authStore';
import { usePostLogout } from '@/features/auth/api/usePostLogout';
import { usePostWithdrawalMutation } from '@/entities/users/api/usePostWithdrawal';
import { PAGE_PATHS } from '@/app/providers/paths';
import { TERM_URL } from '@/shared/config/links';
import { NicknameBottomSheet } from '@/pages/profile/components/NicknameBottomSheet/NicknameBottomSheet';
import { LogoutDialog } from '@/pages/profile/components/LogoutDialog/LogoutDialog';
import { GuestWithdrawalDialog } from '@/pages/profile/components/GuestWithdrawalDialog/GuestWithdrawalDialog';
import { UserWithdrawalDialog } from '@/pages/profile/components/UserWithdrawalDialog/UserWithdrawalDialog';
import { MESSAGE_TYPES } from '@/shared/config/constants';
import { PROVIDER_TYPE } from '@/features/auth/config/constants';

import defaultProfileImage from '@/assets/images/image-profile-default.svg';
import IconEdit from '@/assets/icons/icon-edit.svg?react';
import IconLogout from '@/assets/icons/icon-logout.svg?react';
import IconWarning from '@/assets/icons/icon-warning.svg?react';
import IconChevronRight from '@/assets/icons/icon-chevron-right.svg?react';

import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';

const cx = classNames.bind(styles);

export const ProfilePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    }))
  );
  const postLogout = usePostLogout();
  const postWithdrawal = usePostWithdrawalMutation();

  const [isNicknameEditOpen, setIsNicknameEditOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isUserWithdrawalDialogOpen, setIsUserWithdrawalDialogOpen] =
    useState(false);
  const [isGuestWithdrawalDialogOpen, setIsGuestWithdrawalDialogOpen] =
    useState(false);

  const userProfileImage = defaultProfileImage;
  const userTier = user
    ? `${user.tier.tier.toLowerCase()}_${user.tier.level}`
    : '';
  const isSocialUser = user?.providerType === PROVIDER_TYPE.SOCIAL;
  const termsOfServiceUrl = isSocialUser
    ? TERM_URL.USER_TERMS_OF_SERVICE
    : TERM_URL.GUEST_TERMS_OF_SERVICE;
  const privacyPolicyUrl = isSocialUser
    ? TERM_URL.USER_PRIVACY_POLICY
    : TERM_URL.GUEST_PRIVACY_POLICY;

  const handleEditNickname = () => {
    setIsNicknameEditOpen(true);
  };

  const handleClickLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const { href } = event.currentTarget;

    const isWebView = window.ReactNativeWebView !== undefined;
    if (isWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: MESSAGE_TYPES.OPEN_EXTERNAL_BROWSER,
          url: href,
        })
      );
    } else {
      window.open(href, '_blank');
    }
  };

  const handleLogout = async () => {
    postLogout.mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        queryClient.clear();
      },
      onSettled: () => {
        navigate(PAGE_PATHS.ROOT);
      },
    });
  };

  const handleWithdrawal = async () => {
    postWithdrawal.mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        queryClient.clear();
      },
      onSettled: () => {
        navigate(PAGE_PATHS.ROOT);
      },
    });
  };

  return (
    <>
      <Header>
        <Header.Title>마이</Header.Title>
      </Header>
      <main className="main">
        <div className={cx('profile-header')}>
          <div className={cx('profile-header-inner')}>
            <div className={cx('profile-image-wrapper')}>
              <img
                className={cx('profile-image')}
                src={userProfileImage}
                loading="lazy"
                alt="프로필 이미지"
              />
            </div>
            <strong className={cx('profile-nickname')}>{user?.nickname}</strong>
            <span className={cx('profile-tier')}>{userTier}</span>
            <button
              type="button"
              className={cx('button-profile-edit')}
              onClick={handleEditNickname}
            >
              <IconEdit className={cx('icon-edit')} aria-hidden="true" />
              <span className="sr-only">프로필 수정</span>
            </button>
          </div>
        </div>
        <ul className={cx('action-list')}>
          <li className={cx('action-item')}>
            <a
              href={termsOfServiceUrl}
              className={cx('action-link')}
              onClick={handleClickLink}
            >
              <span className={cx('action-name')}>서비스 이용 약관</span>
              <IconChevronRight
                className={cx('icon-chevron')}
                aria-hidden={true}
              />
            </a>
          </li>
          <li className={cx('action-item')}>
            <a
              href={privacyPolicyUrl}
              className={cx('action-link')}
              onClick={handleClickLink}
            >
              <span className={cx('action-name')}>
                개인정보 수집 및 이용 약관
              </span>
              <IconChevronRight
                className={cx('icon-chevron')}
                aria-hidden={true}
              />
            </a>
          </li>
          <li className={cx('action-item')}>
            <div className={cx('action-item-inner')}>
              <span className={cx('action-name')}>앱 버전</span>
              <span className={cx('version')}>1.0.0</span>
            </div>
          </li>
          <li className={cx('action-item')}>
            <a
              href={TERM_URL.INQUIRY}
              className={cx('action-link')}
              onClick={handleClickLink}
            >
              <span className={cx('action-name')}>문의하기</span>
              <IconChevronRight
                className={cx('icon-chevron')}
                aria-hidden={true}
              />
            </a>
          </li>
          {isSocialUser ? (
            <li className={cx('action-item')}>
              <button
                type="button"
                className={cx('button-action', 'logout')}
                onClick={() => setIsLogoutDialogOpen(true)}
              >
                <IconLogout className={cx('icon-action')} aria-hidden="true" />
                로그아웃
              </button>
            </li>
          ) : (
            <li className={cx('action-item')}>
              <button
                type="button"
                className={cx('button-action', 'logout')}
                onClick={() => navigate(PAGE_PATHS.SOCIAL_CONNECTION)}
              >
                계정 연동
              </button>
            </li>
          )}
          <li className={cx('action-item')}>
            <button
              type="button"
              className={cx('button-action', 'withdrawal')}
              onClick={() =>
                isSocialUser
                  ? setIsUserWithdrawalDialogOpen(true)
                  : setIsGuestWithdrawalDialogOpen(true)
              }
            >
              <IconWarning className={cx('icon-action')} aria-hidden="true" />
              {isSocialUser ? '회원탈퇴' : '게스트 모드 종료'}
            </button>
          </li>
        </ul>
      </main>
      <NicknameBottomSheet
        isOpen={isNicknameEditOpen}
        onClose={() => setIsNicknameEditOpen(false)}
      />
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
      />
      <GuestWithdrawalDialog
        isOpen={isGuestWithdrawalDialogOpen}
        onClose={() => setIsGuestWithdrawalDialogOpen(false)}
        onConfirm={handleWithdrawal}
      />
      <UserWithdrawalDialog
        isOpen={isUserWithdrawalDialogOpen}
        onClose={() => setIsUserWithdrawalDialogOpen(false)}
        onConfirm={handleWithdrawal}
      />
    </>
  );
};

export default ProfilePage;
