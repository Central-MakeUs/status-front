import classNames from 'classnames/bind';
import styles from './StatGrid.module.scss';

const cx = classNames.bind(styles);

export const StatGrid = () => {
  return (
    <div className="main">
      <div className={cx('')}>status page</div>
    </div>
  );
};
