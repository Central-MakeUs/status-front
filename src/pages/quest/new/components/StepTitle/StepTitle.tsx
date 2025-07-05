import classNames from 'classnames/bind';
import styles from './StepTitle.module.scss';

const cx = classNames.bind(styles);

export const StepTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className={cx('step-title')}>{children}</h3>;
};
