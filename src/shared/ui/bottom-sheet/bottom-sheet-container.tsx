import classNames from 'classnames/bind';
import styles from './bottom-sheet-container.module.scss';

const cx = classNames.bind(styles);

interface BottomSheetContainerProps {
  children?: React.ReactNode;
}

export const BottomSheetContainer = ({
  children,
}: BottomSheetContainerProps) => {
  return <div className={cx('bottom-sheet-container')}>{children}</div>;
};
