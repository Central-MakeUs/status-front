import classNames from 'classnames/bind';
import styles from './step-title.module.scss';

const cx = classNames.bind(styles);

interface StepTitleProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
}

export const StepTitle = ({ children, logo }: StepTitleProps) => {
  return (
    <h3 className={cx('step-title')}>
      {logo && <div className={cx('icon-logo')}>{logo}</div>}
      {children}
    </h3>
  );
};
