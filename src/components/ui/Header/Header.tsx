import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

import IconBack from '@/assets/icons/icon-arrow-left.svg?react';

const cx = classNames.bind(styles);

export interface HeaderProps {
  title?: string;
  hasBackButton?: boolean;
}

export const Header = ({ title, hasBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <header className={cx('header', { 'sub-header': hasBackButton })}>
      {title && <h2 className={cx('header-title')}>{title}</h2>}
      {hasBackButton && (
        <button
          type="button"
          className={cx('button-back')}
          onClick={handleBackButtonClick}
        >
          <IconBack className={cx('button-back-icon')} aria-hidden="true" />
          <span className="sr-only">뒤로가기</span>
        </button>
      )}
    </header>
  );
};
