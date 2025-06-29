// src/components/ui/Radio/Radio.tsx
import classNames from 'classnames/bind';
import styles from './Radio.module.scss';

import IconRadioNormal from '@/assets/icons/icon-radio-normal.svg?react';
import IconRadioChecked from '@/assets/icons/icon-radio-checked.svg?react';
import IconRadioDisabled from '@/assets/icons/icon-radio-disabled.svg?react';
import IconRadioDisabledChecked from '@/assets/icons/icon-radio-checked-disabled.svg?react';

const cx = classNames.bind(styles);

export interface RadioProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLSpanElement>) => void;
}

export const Radio = ({
  label,
  checked,
  disabled,
  onClick,
  onKeyDown,
}: RadioProps) => {
  const getIconComponent = () => {
    if (disabled && checked) return IconRadioDisabledChecked;
    if (disabled) return IconRadioDisabled;
    if (checked) return IconRadioChecked;
    return IconRadioNormal;
  };

  const IconComponent = getIconComponent();

  return (
    <span
      role="radio"
      tabIndex={0}
      className={cx('radio')}
      aria-checked={checked}
      aria-disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <IconComponent className={cx('radio-icon')} aria-hidden="true" />
      {label && <span className={cx('radio-text')}>{label}</span>}
    </span>
  );
};
