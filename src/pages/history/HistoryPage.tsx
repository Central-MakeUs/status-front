import { Header } from '@/components/ui/Header/Header';

import classNames from 'classnames/bind';
import styles from './HistoryPage.module.scss';

const cx = classNames.bind(styles);

export const HistoryPage = () => {
  return (
    <>
      <Header title="히스토리" hasBackButton={true} />
      <main className="main">
        <div className={cx('')}>history page</div>
      </main>
    </>
  );
};
