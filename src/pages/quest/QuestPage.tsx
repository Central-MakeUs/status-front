import { Header } from '@/components/ui/Header/Header';

import classNames from 'classnames/bind';
import styles from './QuestPage.module.scss';

const cx = classNames.bind(styles);

export const QuestPage = () => {
  return (
    <>
      <Header title="퀘스트" />
      <div className="main">
        <div className={cx('')}>quest page</div>
      </div>
    </>
  );
};
