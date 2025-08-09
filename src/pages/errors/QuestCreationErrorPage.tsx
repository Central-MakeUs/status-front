import { useNavigate } from 'react-router-dom';

import IconError from '@/assets/icons/icon-character-error.svg?react';

import classNames from 'classnames/bind';
import styles from './QuestCreationErrorPage.module.scss';

const cx = classNames.bind(styles);

const QuestCreationErrorPage = () => {
  const navigate = useNavigate();

  const handleClickPreviousButton = () => {
    navigate(-1);
  };

  return (
    <main className="main">
      <div className={cx('error-container')}>
        <IconError className={cx('error-icon')} aria-hidden="true" />
        <h2 className={cx('error-title')}>퀘스트 생성 실패</h2>
        <p className={cx('error-description')}>
          관할 제왕이 요청을 거절했습니다...
          <br />더 재밌는 퀘스트를 새로 만들어봐요!
        </p>
        <div className={cx('error-actions')}>
          <button
            type="button"
            className={cx('button-error')}
            onClick={handleClickPreviousButton}
          >
            이전으로
          </button>
        </div>
      </div>
    </main>
  );
};

export default QuestCreationErrorPage;
