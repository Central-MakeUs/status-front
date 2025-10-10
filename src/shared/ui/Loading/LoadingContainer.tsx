import classNames from 'classnames/bind';
import styles from './LoadingContainer.module.scss';

const cx = classNames.bind(styles);

interface LoadingContainerProps {
  children: React.ReactNode;
}

export const LoadingContainer = ({ children }: LoadingContainerProps) => {
  return <div className={cx('loading-container')}>{children}</div>;
};
