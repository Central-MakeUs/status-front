import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import profileImage from '@/assets/image.png'; // 절대경로 alias 사용 시

const cx = classNames.bind(styles);

export const Header = ({
  nickname,
  level,
  levelPercent,
}: {
  nickname: string;
  level: number;
  levelPercent: number;
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
