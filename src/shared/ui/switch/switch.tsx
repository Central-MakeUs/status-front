import classNames from 'classnames/bind';
import styles from './switch.module.scss';

const cx = classNames.bind(styles);

interface SwitchProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export const Switch = ({
  label,
  checked,
  disabled,
  onClick,
  onKeyDown,
}: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      className={cx('button-switch')}
      aria-checked={checked}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <span className={cx('sr-only')}>{label}</span>
    </button>
  );
};
