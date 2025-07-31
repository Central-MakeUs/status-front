import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { Header } from '@/components/ui/Header/Header';
import { useAuthStore } from '@/stores/authStore';
import { usePostLogout } from '@/api/hooks/auth';
import { useWithdrawalMutation } from '@/api/hooks/user';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { NicknameBottomSheet } from '@/pages/profile/components/NicknameBottomSheet/NicknameBottomSheet';
import { LogoutDialog } from '@/pages/profile/components/LogoutDialog/LogoutDialog';
import { WithdrawalDialog } from '@/pages/profile/components/WithdrawalDialog/WithdrawalDialog';

import defaultProfileImage from '@/assets/images/image-profile-default.svg';
import IconEdit from '@/assets/icons/icon-edit.svg?react';
import IconLogout from '@/assets/icons/icon-logout.svg?react';
import IconWarning from '@/assets/icons/icon-warning.svg?react';

import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';

const cx = classNames.bind(styles);

// [TODO] 티어 데이터 추가 후 삭제
const DEMO_TIER = 'Platinum_1';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser,
    }))
  );
  const postLogout = usePostLogout();
  const postWithdrawal = useWithdrawalMutation();

  const [isNicknameEditOpen, setIsNicknameEditOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false);

  const userProfileImage = defaultProfileImage;

  const handleLogout = async () => {
    postLogout.mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        navigate(PAGE_PATHS.ROOT);
      },
      onError: () => {
        // [TODO] 로그아웃 실패 에러 처리 기획 필요
      },
    });
  };

  const handleWithdrawal = async () => {
    postWithdrawal.mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        navigate(PAGE_PATHS.ROOT);
      },
      onError: () => {
        // [TODO] 회원 탈퇴 실패 에러 처리 기획 필요
      },
    });
  };

  return (
    <>
      <Header title="마이" />
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
            <span className={cx('profile-tier')}>{DEMO_TIER}</span>
            <button
              type="button"
              className={cx('button-profile-edit')}
              onClick={() => setIsNicknameEditOpen(true)}
            >
              <IconEdit className={cx('icon-edit')} aria-hidden="true" />
              <span className="sr-only">프로필 수정</span>
            </button>
          </div>
        </div>
        <ul className={cx('action-list')}>
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
          <li className={cx('action-item')}>
            <button
              type="button"
              className={cx('button-action', 'withdrawal')}
              onClick={() => setIsWithdrawalDialogOpen(true)}
            >
              <IconWarning className={cx('icon-action')} aria-hidden="true" />
              회원 탈퇴
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
      <WithdrawalDialog
        isOpen={isWithdrawalDialogOpen}
        onClose={() => setIsWithdrawalDialogOpen(false)}
        onConfirm={handleWithdrawal}
      />
    </>
  );
};

export default ProfilePage;
