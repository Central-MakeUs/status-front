import classNames from 'classnames/bind';
import styles from './StatusPage.module.scss';

const cx = classNames.bind(styles);

export const StatusPage = () => {
  return (
    <div className="main">
      <div className={cx('')}>status page</div>
    </div>
  );
};
