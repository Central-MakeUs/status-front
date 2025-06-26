import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
  varient?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  varient,
  children,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cx('common-button', varient)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
