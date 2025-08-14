import { PAGE_PATHS } from '@/constants/pagePaths';

import IconError from '@/assets/icons/icon-character-error.svg?react';

import classNames from 'classnames/bind';
import styles from './ServerErrorPage.module.scss';

const cx = classNames.bind(styles);

export const ServerErrorPage = () => {
  const handleClickHomeButton = () => {
    window.location.href = PAGE_PATHS.ROOT;
  };

  return (
    <main className="main">
      <div className={cx('error-container')}>
        <IconError className={cx('error-icon')} aria-hidden="true" />
        <h2 className={cx('error-title')}>서버에 문제가 발생했어요!</h2>
        <p className={cx('error-description')}>
          홈으로 이동 후 다시 시도해주세요.
        </p>
        <div className={cx('error-actions')}>
          <button
            type="button"
            className={cx('button-error')}
            onClick={handleClickHomeButton}
          >
            홈으로
          </button>
        </div>
      </div>
    </main>
  );
};
