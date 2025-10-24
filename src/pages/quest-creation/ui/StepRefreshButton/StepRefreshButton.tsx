import IconRefresh from '@/assets/icons/icon-refresh.svg?react';

import classNames from 'classnames/bind';
import styles from './StepRefreshButton.module.scss';

const cx = classNames.bind(styles);

interface StepRefreshButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export const StepRefreshButton = ({
  onClick,
  isLoading,
}: StepRefreshButtonProps) => {
  return (
    <div className={cx('step-refresh')}>
      <button
        type="button"
        className={cx('button-refresh', {
          'is-loading': isLoading,
        })}
        onClick={onClick}
      >
        <IconRefresh className={cx('button-refresh-icon')} aria-hidden="true" />
        <span className="sr-only">카테고리 새로고침</span>
      </button>
    </div>
  );
};
