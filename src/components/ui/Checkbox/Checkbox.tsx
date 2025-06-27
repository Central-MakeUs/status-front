import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';

import IconCheckboxNormal from '@/assets/icons/icon-checkbox-normal.svg?react';
import IconCheckboxChecked from '@/assets/icons/icon-checkbox-checked.svg?react';
import IconCheckboxDisabled from '@/assets/icons/icon-checkbox-disabled.svg?react';
import IconCheckboxDisabledChecked from '@/assets/icons/icon-checkbox-checked-disabled.svg?react';

const cx = classNames.bind(styles);

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLSpanElement>) => void;
}

export const Checkbox = ({
  label,
  checked,
  disabled,
  onClick,
  onKeyDown,
}: CheckboxProps) => {
  const getIconComponent = () => {
    if (disabled && checked) return IconCheckboxDisabledChecked;
    if (disabled) return IconCheckboxDisabled;
    if (checked) return IconCheckboxChecked;
    return IconCheckboxNormal;
  };

  const IconComponent = getIconComponent();

  return (
    <span
      role="checkbox"
      tabIndex={0}
      className={cx('checkbox')}
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <IconComponent className={cx('checkbox-icon')} aria-hidden="true" />
      {label && <span className={cx('checkbox-text')}>{label}</span>}
    </span>
  );
};
