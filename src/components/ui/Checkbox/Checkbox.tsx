import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';

import IconCheckboxNormal from '@/assets/icons/icon-checkbox-normal.svg?react';
import IconCheckboxChecked from '@/assets/icons/icon-checkbox-checked.svg?react';
import IconCheckboxDisabled from '@/assets/icons/icon-checkbox-disabled.svg?react';
import IconCheckboxDisabledChecked from '@/assets/icons/icon-checkbox-checked-disabled.svg?react';

const cx = classNames.bind(styles);

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLSpanElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

interface CheckboxLabelProps {
  children: React.ReactNode;
  className?: string;
}

const CheckboxMain = ({
  checked,
  disabled,
  required,
  onClick,
  className,
  children,
}: CheckboxProps) => {
  const getIconComponent = () => {
    if (disabled && checked) return IconCheckboxDisabledChecked;
    if (disabled) return IconCheckboxDisabled;
    if (checked) return IconCheckboxChecked;
    return IconCheckboxNormal;
  };

  const IconComponent = getIconComponent();

  return (
    <button
      type="button"
      role="checkbox"
      className={cx('checkbox', className)}
      aria-checked={checked}
      disabled={disabled}
      aria-required={required}
      onClick={onClick}
    >
      <IconComponent className={cx('checkbox-icon')} aria-hidden="true" />
      {children}
    </button>
  );
};

const CheckboxLabel = ({ children, className }: CheckboxLabelProps) => {
  return <span className={cx('checkbox-text', className)}>{children}</span>;
};

export const Checkbox = Object.assign(CheckboxMain, {
  Label: CheckboxLabel,
});
