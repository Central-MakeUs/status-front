import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { BottomSheetContainer } from './BottomSheetContainer';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useSwipeToClose } from '@/hooks/useSwipeToClose';

import type { ReactNode } from 'react';

import classNames from 'classnames/bind';
import styles from './BottomSheet.module.scss';

const cx = classNames.bind(styles);

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const BottomSheetMain = ({
  isOpen,
  onClose,
  children,
  className,
}: BottomSheetProps) => {
  const bottomSheetRef = useRef<HTMLDivElement | null>(null);
  const { swipeHandlers } = useSwipeToClose({
    ref: bottomSheetRef,
    onClose,
  });

  useOutsideClick(bottomSheetRef, onClose);

  const handleBottomSheetContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!isOpen) return null;

  return createPortal(
    <BottomSheetContainer>
      <div
        ref={bottomSheetRef}
        role="dialog"
        aria-modal="true"
        onClick={handleBottomSheetContainerClick}
        className={cx('bottom-sheet', className)}
      >
        <button
          type="button"
          className={cx('button-handler')}
          {...swipeHandlers}
        >
          <span className={cx('sr-only')}>아래로 스와이프하여 닫기</span>
        </button>
        {children}
      </div>
    </BottomSheetContainer>,
    document.getElementById('modal-root') as HTMLElement
  );
};

const BottomSheetHeader = ({ children }: { children: ReactNode }) => {
  return <div className={cx('bottom-sheet-header')}>{children}</div>;
};

const BottomSheetTitle = ({ children }: { children: ReactNode }) => {
  return <strong className={cx('bottom-sheet-title')}>{children}</strong>;
};

const BottomSheetDescription = ({ children }: { children: ReactNode }) => {
  return <p className={cx('bottom-sheet-description')}>{children}</p>;
};

const BottomSheetSubTitle = ({ children }: { children: ReactNode }) => {
  return <strong className={cx('bottom-sheet-sub-title')}>{children}</strong>;
};

const BottomSheetContent = ({ children }: { children: ReactNode }) => {
  return <div className={cx('bottom-sheet-content')}>{children}</div>;
};

const BottomSheetFooter = ({ children }: { children: ReactNode }) => {
  return <div className={cx('bottom-sheet-footer')}>{children}</div>;
};

export const BottomSheet = Object.assign(BottomSheetMain, {
  Header: BottomSheetHeader,
  Title: BottomSheetTitle,
  Description: BottomSheetDescription,
  SubTitle: BottomSheetSubTitle,
  Content: BottomSheetContent,
  Footer: BottomSheetFooter,
});
