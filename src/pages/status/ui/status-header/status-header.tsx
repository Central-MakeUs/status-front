import { TierIcon } from '@/shared/ui/tier-icon/tier-icon';
import { useAuthStore } from '@/features/auth/model/auth-store';
import { useShallow } from 'zustand/react/shallow';
import { DEFAULT_TIER, DEFAULT_TIER_LEVEL } from '@/shared/config/user';
import profileImageUrl from '@/assets/images/image-profile-default.svg';

import classNames from 'classnames/bind';
import styles from './status-header.module.scss';

const cx = classNames.bind(styles);

interface StatusHeaderProps {
  onShowTierLevel: () => void;
}

export const StatusHeader = ({ onShowTierLevel }: StatusHeaderProps) => {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  const userTier = user?.tier.tier ?? DEFAULT_TIER;
  const userLevel = user?.tier.level ?? DEFAULT_TIER_LEVEL;

  return (
    <header className={cx('status-header')}>
      <div className={cx('profile-area')}>
        <div className={cx('thumbnail')}>
          <img
            loading="lazy"
            className={cx('thumbnail-image')}
            src={profileImageUrl}
            alt="프로필 이미지"
          />
        </div>
        <span className={cx('nickname')}>{user?.nickname}</span>
      </div>
      <button
        type="button"
        className={cx('button-tier-info')}
        onClick={onShowTierLevel}
      >
        <TierIcon id={userTier} className={cx('tier-icon')} />
        <span className={cx('tier-text')}>
          {userTier.toLowerCase()} {userLevel}
        </span>
      </button>
    </header>
  );
};
