import classNames from 'classnames/bind';
import styles from './RadioGroup.module.scss';

const cx = classNames.bind(styles);

export interface RadioGroupProps {
  children?: React.ReactNode;
}

export const RadioGroup = ({ children }: RadioGroupProps) => {
  return (
    <div role="radiogroup" className={cx('radio-group')}>
      {children}
    </div>
  );
};
