import { TierIcon } from '@/shared/ui/tier-icon/tier-icon';
import type { TierType } from '@/entities/user/model/user';

import classNames from 'classnames/bind';
import styles from './status-header.module.scss';

const cx = classNames.bind(styles);

interface StatusHeaderProps {
  nickname: string;
  tier: TierType;
  level: number;
  profileImageUrl: string;
  onClick: (event: React.MouseEvent) => void;
}

export const StatusHeader = ({
  nickname,
  tier,
  level,
  profileImageUrl,
  onClick,
}: StatusHeaderProps) => {
  return (
    <header className={cx('header')}>
      <div className={cx('profile')}>
        <div className={cx('nickname')}>
          <img src={profileImageUrl} alt="" className={cx('avatar')} />
          <div>{nickname}</div>
        </div>
        <button
          type="button"
          className={cx('tier-info')}
          onClick={(event) => onClick(event)}
        >
          <TierIcon id={tier} className={cx('tier-icon')} />
          <div className={cx('tier-text')}>
            {tier.toLowerCase()} {level}
          </div>
        </button>
      </div>
    </header>
  );
};
