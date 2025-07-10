import IconError from '@/assets/icons/icon-error.svg?react';

import classNames from 'classnames/bind';
import styles from './ServerErrorPage.module.scss';

const cx = classNames.bind(styles);

export const ServerErrorPage = () => {
  const handleClickRefreshButton = () => {
    window.location.reload();
  };

  return (
    <main className="main">
      <div className={cx('error-container')}>
        <IconError className={cx('error-icon')} aria-hidden="true" />
        <h2 className={cx('error-title')}>잠시 후 다시 시도해주세요!</h2>
        <p className={cx('error-description')}>
          서버에 문제가 발생했어요
          <br />
          페이지를 새로고침하여 다시 시도해볼까요?
        </p>
        <div className={cx('error-actions')}>
          <button
            type="button"
            className={cx('button-refresh')}
            onClick={handleClickRefreshButton}
          >
            새로고침
          </button>
        </div>
      </div>
    </main>
  );
};
