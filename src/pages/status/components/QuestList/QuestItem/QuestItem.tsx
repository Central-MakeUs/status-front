import classNames from 'classnames/bind';
import styles from './QuestItem.module.scss';
import type { Quest } from '@/types/quest';

const cx = classNames.bind(styles);

export const QuestItem = ({ title, expiredAt, totalDays, progress }: Quest) => {
  return (
    <div className={cx('questItem')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('meta')}>
        기한_{expiredAt} (총 {totalDays}일)
      </div>
      <div className={cx('progress')}>
        <div className={cx('label')}>진행도 {progress}%</div>
        <div className={cx('bar')}>
          <div className={cx('fill')} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};
