import IconRadioNormal from '@/assets/icons/icon-radio-normal.svg?react';
import IconRadioChecked from '@/assets/icons/icon-radio-checked.svg?react';

import classNames from 'classnames/bind';
import styles from './StepRadioGroup.module.scss';

const cx = classNames.bind(styles);

type Identifiable = {
  id: string;
};

type Displayable = { title: string } | { name: string };

interface StepRadioGroupProps<T> {
  label: string;
  data: T[] | undefined;
  value: T | null;
  onClick: (item: T) => void;
}

export const StepRadioGroup = <T extends Identifiable & Displayable>({
  label,
  data,
  value,
  onClick,
}: StepRadioGroupProps<T>) => {
  return (
    <div
      role="radiogroup"
      className={cx('step-radio-group')}
      aria-label={label}
    >
      {data?.map((item) => (
        <span
          key={item.id}
          role="radio"
          tabIndex={0}
          className={cx('step-radio')}
          aria-checked={value === item}
          onClick={() => {
            onClick(item);
          }}
        >
          {value === item ? (
            <IconRadioChecked
              className={cx('step-radio-icon')}
              aria-hidden="true"
            />
          ) : (
            <IconRadioNormal
              className={cx('step-radio-icon')}
              aria-hidden="true"
            />
          )}
          <span className={cx('step-radio-name')}>
            {'title' in item ? item.title : item.name}
          </span>
        </span>
      ))}
    </div>
  );
};
