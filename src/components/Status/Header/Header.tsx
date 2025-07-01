import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

export const Header = ({
  nickname,
  level,
  levelPercent,
  profileImage,
}: {
  nickname: string;
  level: number;
  levelPercent: number;
  profileImage: string;
}) => {
  return (
    <header className={cx('header')}>
      <div className={cx('profile')}>
        <div className={cx('nickname')}>
          <img src={profileImage} alt="" className={cx('avatar')} />
          <div>{nickname}</div>
        </div>
        <div
          className={cx('levelProgressBar')}
          style={
            { '--level-percent': `${levelPercent}%` } as React.CSSProperties
          }
        >
          <div className={cx('levelText')}>
            Lv. {level} ({levelPercent}%)
          </div>
        </div>
      </div>
    </header>
  );
};
