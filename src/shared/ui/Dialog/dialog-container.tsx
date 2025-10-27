import classNames from 'classnames/bind';
import styles from './dialog-container.module.scss';

const cx = classNames.bind(styles);

interface DialogContainerProps {
  children?: React.ReactNode;
}

export const DialogContainer = ({ children }: DialogContainerProps) => {
  return <div className={cx('dialog-container')}>{children}</div>;
};
