import { useId } from 'react';

import classNames from 'classnames/bind';
import styles from './TextInput.module.scss';

const cx = classNames.bind(styles);

export interface TextInputProps {
  label: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'url';
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export const TextInput = ({
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  errorMessage,
}: TextInputProps) => {
  const inputId = useId();
  const errorMessageId = useId();

  return (
    <div className={cx('input-wrapper')}>
      <label htmlFor={inputId} className={cx('input-label')}>
        {label}
      </label>
      <div className={cx('input-field-wrapper')}>
        <input
          type={type}
          id={inputId}
          className={cx('input-field')}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          aria-describedby={errorMessage ? errorMessageId : undefined}
          aria-invalid={!!errorMessage}
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
