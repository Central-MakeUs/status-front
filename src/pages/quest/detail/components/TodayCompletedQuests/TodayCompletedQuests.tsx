import classNames from 'classnames/bind';
import styles from './TodayCompletedQuests.module.scss';

const cx = classNames.bind(styles);

const TodayCompletedQuests = () => {
  return (
    <>
      <main className="main">
        <div className={cx('container')}>
          <div className={cx('header')}>오늘 완료한 퀘스트</div>
        </div>
      </main>
    </>
  );
};

export default TodayCompletedQuests;
