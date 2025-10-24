import classNames from 'classnames/bind';
import styles from './SubQuestSkeleton.module.scss';

const cx = classNames.bind(styles);

export const SubQuestSkeleton = () => {
  return (
    <div className={cx('sub-quest-skeleton')} aria-hidden="true">
      <div className={cx('sub-quest-skeleton-icon')}></div>
      <div className={cx('sub-quest-skeleton-frequency')}></div>
      <div className={cx('sub-quest-skeleton-description')}></div>
      <div className={cx('sub-quest-skeleton-edit')}></div>
    </div>
  );
};
