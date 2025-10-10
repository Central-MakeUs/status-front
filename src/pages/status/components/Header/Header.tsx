import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { TierIcon } from '@/shared/ui/TierIcon/TierIcon';
import type { TierType } from '@/types/tier';

const cx = classNames.bind(styles);

interface HeaderProps {
  nickname: string;
  tier: TierType;
  level: number;
  profileImageUrl: string;
  onClick: (event: React.MouseEvent) => void;
}

export const Header = ({
  nickname,
  tier,
  level,
  profileImageUrl,
  onClick,
}: HeaderProps) => {
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
