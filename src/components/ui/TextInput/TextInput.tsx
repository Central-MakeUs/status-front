import { useId } from 'react';

import classNames from 'classnames/bind';
import styles from './TextInput.module.scss';

const cx = classNames.bind(styles);

export interface TextInputProps {
  className?: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number';
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'search' | 'email';
  value?: string | number;
  placeholder?: string;
  maxLength?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  disabled?: boolean;
}

export const TextInput = ({
  className,
  label,
  type = 'text',
  inputMode,
  value,
  placeholder,
  maxLength,
  onChange,
  errorMessage,
  disabled,
}: TextInputProps) => {
  const inputId = useId();
  const errorMessageId = useId();

  return (
    <div className={cx('input-wrapper', className)}>
      {label && (
        <label htmlFor={inputId} className={cx('input-label')}>
          {label}
        </label>
      )}
      <div className={cx('input-field-wrapper')}>
        <input
          type={type}
          id={inputId}
          inputMode={inputMode}
          className={cx('input-field')}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          aria-describedby={errorMessage ? errorMessageId : undefined}
          aria-invalid={!!errorMessage}
          aria-disabled={disabled}
        />
      </div>
      {errorMessage && (
        <p role="alert" id={errorMessageId} className={cx('input-error')}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
