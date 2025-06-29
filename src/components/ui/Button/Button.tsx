import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  variant,
  children,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cx('common-button', variant)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
