import { useId } from 'react';

import classNames from 'classnames/bind';
import styles from './Textarea.module.scss';

const cx = classNames.bind(styles);

export interface TextareaProps {
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorMessage?: string;
}

export const Textarea = ({
  label,
  value,
  placeholder,
  onChange,
  errorMessage,
}: TextareaProps) => {
  const textareaId = useId();
  const errorMessageId = useId();

  return (
    <div className={cx('textarea-wrapper')}>
      <label htmlFor={textareaId} className={cx('textarea-label')}>
        {label}
      </label>
      <div className={cx('textarea-field-wrapper')}>
        <textarea
          id={textareaId}
          className={cx('textarea-field')}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          aria-describedby={errorMessage ? errorMessageId : undefined}
          aria-invalid={!!errorMessage}
        />
      </div>
      {errorMessage && (
        <p role="alert" id={errorMessageId} className={cx('textarea-error')}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
