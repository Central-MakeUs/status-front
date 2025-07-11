import classNames from 'classnames/bind';
import styles from './StepDescription.module.scss';

const cx = classNames.bind(styles);

interface StepDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const StepDescription = ({
  className,
  children,
}: StepDescriptionProps) => {
  return <div className={cx('step-description', className)}>{children}</div>;
};
