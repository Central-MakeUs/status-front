import classNames from 'classnames/bind';
import styles from './StepRadioGroupSkeleton.module.scss';

const cx = classNames.bind(styles);

interface StepRadioGroupSkeletonProps {
  length?: number;
}

export const StepRadioGroupSkeleton = ({
  length = 5,
}: StepRadioGroupSkeletonProps) => {
  return (
    <div className={cx('step-radio-group-skeleton')}>
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={cx('step-radio-skeleton')}
          aria-hidden="true"
        >
          <div className={cx('step-radio-skeleton-icon')}></div>
          <div className={cx('step-radio-skeleton-name')}></div>
        </div>
      ))}
    </div>
  );
};
