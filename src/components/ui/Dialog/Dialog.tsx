import { createPortal } from 'react-dom';
import { DialogContainer } from '@/components/ui/Dialog/DialogContainer';

import classNames from 'classnames/bind';
import styles from './Dialog.module.scss';

const cx = classNames.bind(styles);

export const DialogMain = ({ children }: { children: React.ReactNode }) => {
  return createPortal(
    <DialogContainer>
      <div role="dialog" className={cx('dialog')}>
        {children}
      </div>
    </DialogContainer>,
    document.getElementById('modal-root') as HTMLElement
  );
};

const DialogTitle = ({ children }: { children: React.ReactNode }) => {
  return <strong className={cx('dialog-title')}>{children}</strong>;
};

const DialogDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className={cx('dialog-description')}>{children}</p>;
};

const DialogActions = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx('dialog-actions')}>{children}</div>;
};

export const Dialog = Object.assign(DialogMain, {
  Title: DialogTitle,
  Description: DialogDescription,
  Actions: DialogActions,
});
