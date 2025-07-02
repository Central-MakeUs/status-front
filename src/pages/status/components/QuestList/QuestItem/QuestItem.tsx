import classNames from 'classnames/bind';
import styles from './QuestItem.module.scss';

const cx = classNames.bind(styles);

interface QuestItemProps {
  title: string;
  deadline: string;
  totalDays: number;
  progress: number;
}

export const QuestItem = ({
  title,
  deadline,
  totalDays,
  progress,
}: QuestItemProps) => {
  return (
    <div className={cx('questItem')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('meta')}>
        기한_{deadline} (총 {totalDays}일)
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
