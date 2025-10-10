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
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Radio = ({ label, checked, disabled, onClick }: RadioProps) => {
  const getIconComponent = () => {
    if (disabled && checked) return IconRadioDisabledChecked;
    if (disabled) return IconRadioDisabled;
    if (checked) return IconRadioChecked;
    return IconRadioNormal;
  };

  const IconComponent = getIconComponent();

  return (
    <button
      type="button"
      role="radio"
      className={cx('radio')}
      aria-checked={checked}
      disabled={disabled}
      onClick={onClick}
    >
      <IconComponent className={cx('radio-icon')} aria-hidden="true" />
      {label && <span className={cx('radio-text')}>{label}</span>}
    </button>
  );
};
