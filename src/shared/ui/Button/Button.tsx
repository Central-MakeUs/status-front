import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  variant,
  className,
  children,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cx('common-button', variant, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
