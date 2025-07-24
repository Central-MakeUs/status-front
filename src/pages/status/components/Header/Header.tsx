import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { TierIcon } from '@/components/ui/TierIcon/TierIcon';
import type { UserInfo } from '@/types/user';

const cx = classNames.bind(styles);

interface HeaderProps
  extends Omit<UserInfo, 'id' | 'email' | 'providerType' | 'providerId'> {
  onClick: () => void;
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
        <div className={cx('tier-info')} onClick={onClick}>
          <TierIcon id={tier} className={cx('tier-icon')} />
          <div className={cx('tier-text')}>
            {tier}_{level}
          </div>
        </div>
      </div>
    </header>
  );
};
