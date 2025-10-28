import { Button } from '@/shared/ui/button/button';

import classNames from 'classnames/bind';
import styles from './step-actions.module.scss';

const cx = classNames.bind(styles);

interface StepActionProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const StepActions = ({
  children,
  disabled,
  onClick,
}: StepActionProps) => {
  return (
    <footer className={cx('step-actions')}>
      <Button variant="secondary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </footer>
  );
};
