import { useGetUserTodayCompletedQuests } from '@/api/hooks/quest/useGetUserTodayCompletedQuests';
import CompletedQuestList from '../CompletedQuestList/CompletedQuestList';

import classNames from 'classnames/bind';
import styles from './TodayCompletedQuests.module.scss';
const cx = classNames.bind(styles);

const TodayCompletedQuests = ({ userId }: { userId: string }) => {
  const { data: quests } = useGetUserTodayCompletedQuests(userId);

  return (
    <>
      <main className="main">
        <div className={cx('container')}>
          <div className={cx('header')}>오늘 완료한 퀘스트</div>
          {quests &&
            quests.map((quest) => (
              <CompletedQuestList key={quest.id} quest={quest} />
            ))}
        </div>
      </main>
    </>
  );
};

export default TodayCompletedQuests;
