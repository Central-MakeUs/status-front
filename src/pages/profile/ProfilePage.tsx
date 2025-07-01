import { Header } from '@/components/ui/Header/Header';

import classNames from 'classnames/bind';
import styles from './ProfilePage.module.scss';

const cx = classNames.bind(styles);

export const ProfilePage = () => {
  return (
    <>
      <Header title="마이페이지" />
      <div className="main">
        <div className={cx('')}>profile page</div>
      </div>
    </>
  );
};
