import { useNavigate } from 'react-router-dom';

import IconBack from '@/assets/icons/icon-arrow-left.svg?react';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const HeaderMain = ({ children }: { children: React.ReactNode }) => {
  return <header className={cx('header')}>{children}</header>;
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h2 className={cx('header-title')}>{children}</h2>;
};

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className={cx('button-back')}
      onClick={handleBackButtonClick}
    >
      <IconBack className={cx('button-back-icon')} aria-hidden="true" />
      <span className="sr-only">뒤로가기</span>
    </button>
  );
};

const Actions = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx('actions')}>{children}</div>;
};

const ActionButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button type="button" className={cx('button-header-action')}>
      {children}
    </button>
  );
};

export const Header = Object.assign(HeaderMain, {
  Title,
  BackButton,
  Actions,
  ActionButton,
});
