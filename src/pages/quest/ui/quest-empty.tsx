import IconEmpty from '@/assets/icons/icon-character-empty.svg?react';
import IconArrow from '@/assets/icons/icon-arrow-downward.svg?react';
import classNames from 'classnames/bind';
import styles from './quest-empty.module.scss';

const cx = classNames.bind(styles);

export const QuestEmpty = () => {
  return (
    <div className={cx('quest-empty')}>
      <IconEmpty className={cx('icon-empty')} aria-hidden="true" />
      <p className={cx('message')}>
        진행 중인 퀘스트가 없습니다.
        <br />
        새로운 퀘스트를 만들어보세요!
      </p>
      <IconArrow className={cx('icon-arrow-down')} aria-hidden="true" />
    </div>
  );
};
