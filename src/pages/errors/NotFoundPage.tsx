import { useNavigate } from 'react-router-dom';

import IconError from '@/assets/icons/icon-character-error.svg?react';

import classNames from 'classnames/bind';
import styles from './NotFoundPage.module.scss';

const cx = classNames.bind(styles);

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClickPreviousButton = () => {
    navigate(-1);
  };

  return (
    <main className="main">
      <div className={cx('error-container')}>
        <IconError className={cx('error-icon')} aria-hidden="true" />
        <h2 className={cx('error-title')}>페이지를 찾을 수 없습니다</h2>
        <p className={cx('error-description')}>
          잘못된 URL이거나 삭제된 페이지에요.
          <br />
          이전 페이지로 돌아갈까요?
        </p>
        <div className={cx('error-actions')}>
          <button
            type="button"
            className={cx('button-previous')}
            onClick={handleClickPreviousButton}
          >
            이전으로
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
