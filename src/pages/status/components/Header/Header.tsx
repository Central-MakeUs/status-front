import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import type { UserInfo } from '@/types/user';
import { TierIcon } from '@/components/ui/TierIcon/TierIcon';

const cx = classNames.bind(styles);

export const Header = ({
  nickname,
  tier,
  level,
  levelPercent,
  profileImageUrl,
}: UserInfo) => {
  console.log(levelPercent);
  return (
    <header className={cx('header')}>
      <div className={cx('profile')}>
        <div className={cx('nickname')}>
          <img src={profileImageUrl} alt="" className={cx('avatar')} />
          <div>{nickname}</div>
        </div>
        <div className={cx('tier-info')}>
          <TierIcon id={tier} className={cx('tier-icon')} />
          <div className={cx('tier-text')}>
            {tier}_{level}
          </div>
        </div>
      </div>
    </header>
  );
};
