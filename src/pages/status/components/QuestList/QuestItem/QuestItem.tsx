import classNames from 'classnames/bind';
import styles from './QuestItem.module.scss';
import type { UserMainQuest } from '@/types/quest';
import { getWeeksDifference } from '@/utils/date';

const cx = classNames.bind(styles);

export const QuestItem = ({
  title,
  startDate,
  endDate,
  progress,
}: UserMainQuest) => {
  return (
    <div className={cx('questItem')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('meta')}>
        기한_{endDate} (총 {getWeeksDifference(startDate, endDate)}주)
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
