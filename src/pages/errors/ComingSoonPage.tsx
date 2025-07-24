import IconError from '@/assets/icons/icon-character-error-2.svg?react';

import classNames from 'classnames/bind';
import styles from './ComingSoonPage.module.scss';

const cx = classNames.bind(styles);

export const ComingSoonPage = () => {
  return (
    <main className="main">
      <div className={cx('error-container')}>
        <IconError className={cx('error-icon')} aria-hidden="true" />
        <h2 className={cx('error-title')}>열심히 개발 중!</h2>
        <p className={cx('error-description')}>
          곧 업데이트 예정인 기능입니다. 기대해주세요
        </p>
      </div>
    </main>
  );
};
