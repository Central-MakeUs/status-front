import IconEmpty from '@/assets/icons/icon-character-empty-2.svg?react';
import classNames from 'classnames/bind';
import styles from './HistoryEmpty.module.scss';

const cx = classNames.bind(styles);

export const HistoryEmpty = () => {
  return (
    <div className={cx('history-empty')}>
      <IconEmpty className={cx('icon-empty')} aria-hidden="true" />
      <p className={cx('message')}>
        아직 완료한 퀘스트가 없어요.
        <br />
        첫번째 메인 퀘스트를 완료해보세요!
      </p>
    </div>
  );
};
