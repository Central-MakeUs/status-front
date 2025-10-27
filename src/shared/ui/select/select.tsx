import { useId, useState } from 'react';

import IconExpandLess from '@/assets/icons/icon-expand-less.svg?react';
import IconExpandMore from '@/assets/icons/icon-expand-more.svg?react';

import classNames from 'classnames/bind';
import styles from './select.module.scss';

const cx = classNames.bind(styles);

interface SelectProps<T extends string | number> {
  className?: string;
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

export const Select = <T extends string | number>({
  className,
  label,
  value,
  options,
  onChange,
}: SelectProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const listboxId = useId();
  const optionId = useId();

  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption?.label || '';

  const handleClickOption = (option: { value: T; label: string }) => {
    setIsExpanded(false);
    onChange(option.value);
  };

  return (
    <div className={cx('select-wrapper', className)}>
      <strong className={cx('select-label')}>{label}</strong>
      <div className={cx('select-button-wrapper')}>
        <button
          type="button"
          role="combobox"
          aria-expanded={isExpanded}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={optionId}
          onClick={() => setIsExpanded(!isExpanded)}
          className={cx('select-button')}
        >
          <span className={cx('select-button-value')}>{displayValue}</span>
          {isExpanded ? (
            <IconExpandLess
              className={cx('select-button-icon')}
              aria-hidden="true"
            />
          ) : (
            <IconExpandMore
              className={cx('select-button-icon')}
              aria-hidden="true"
            />
          )}
        </button>
        {isExpanded && (
          <div role="listbox" id={listboxId} className={cx('select-listbox')}>
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                id={optionId}
                aria-selected={option.value === value}
                className={cx('select-listbox-item')}
                onClick={() => handleClickOption(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
