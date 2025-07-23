import classNames from 'classnames/bind';
import styles from './CompletedHistory.module.scss';

const cx = classNames.bind(styles);

const CompletedHistory = () => {
  return (
    <>
      <main className="main">
        <div className={cx('container')}>
          <div className={cx('header')}>완료 히스토리</div>
        </div>
      </main>
    </>
  );
};

export default CompletedHistory;
