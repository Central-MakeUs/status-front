import { Header } from '@/components/ui/Header/Header';

import classNames from 'classnames/bind';
import styles from './ChallengePage.module.scss';

const cx = classNames.bind(styles);

export const ChallengePage = () => {
  return (
    <>
      <Header title="퀘스트" />
      <div className="main">
        <div className={cx('')}>challenge page</div>
      </div>
    </>
  );
};
