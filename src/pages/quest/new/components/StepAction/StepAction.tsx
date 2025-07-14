import { Button } from '@/components/ui/Button/Button';

import classNames from 'classnames/bind';
import styles from './StepAction.module.scss';

const cx = classNames.bind(styles);

interface StepActionProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const StepAction = ({
  children,
  disabled,
  onClick,
}: StepActionProps) => {
  return (
    <footer className={cx('step-footer')}>
      <Button variant="secondary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </footer>
  );
};
