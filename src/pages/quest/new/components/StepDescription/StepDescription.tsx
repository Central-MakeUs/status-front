import classNames from 'classnames/bind';
import styles from './StepDescription.module.scss';

const cx = classNames.bind(styles);

interface StepDescriptionProps {
  children: React.ReactNode;
}

export const StepDescription = ({ children }: StepDescriptionProps) => {
  return <div className={cx('step-description')}>{children}</div>;
};
