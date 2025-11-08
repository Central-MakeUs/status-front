import defaultProfileImage from '@/assets/images/image-profile-default.svg';
import IconEdit from '@/assets/icons/icon-edit.svg?react';

import classNames from 'classnames/bind';
import styles from './user-profile.module.scss';
import { useAuthStore } from '@/features/auth/model/auth-store';
import { useShallow } from 'zustand/react/shallow';

const cx = classNames.bind(styles);

interface UserProfileProps {
  onEditNickname: () => void;
}

export const UserProfile = ({ onEditNickname }: UserProfileProps) => {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );
  const userTier = user
    ? `${user.tier.tier.toLowerCase()}_${user.tier.level}`
    : '';
  const userProfileImage = defaultProfileImage;

  return (
    <div className={cx('user-profile')}>
      <div className={cx('user-profile-inner')}>
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
          onClick={onEditNickname}
        >
          <IconEdit className={cx('icon-edit')} aria-hidden="true" />
          <span className="sr-only">프로필 수정</span>
        </button>
      </div>
    </div>
  );
};
