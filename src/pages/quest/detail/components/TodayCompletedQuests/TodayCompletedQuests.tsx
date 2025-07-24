import { useGetUserTodayCompletedQuests } from '@/api/hooks/quest/useGetUserTodayCompletedQuests';
import CompletedQuestList from '../CompletedQuestList/CompletedQuestList';

import classNames from 'classnames/bind';
import styles from './TodayCompletedQuests.module.scss';
import type { SubQuestDifficulty, UserSubQuest } from '@/types/quest';
const cx = classNames.bind(styles);

const TodayCompletedQuests = ({
  userId,
  onClick,
}: {
  userId: string;
  onClick: (
    quest: UserSubQuest,
    difficulty: SubQuestDifficulty,
    memo: string
  ) => void;
}) => {
  const { data: quests } = useGetUserTodayCompletedQuests(userId);

  return (
    <>
      <main className="main">
        <div className={cx('container')}>
          <div className={cx('header')}>오늘 완료한 퀘스트</div>
          {quests &&
            quests.map((quest) => (
              <CompletedQuestList
                key={quest.id}
                quest={quest}
                onClick={onClick}
              />
            ))}
        </div>
      </main>
    </>
  );
};

export default TodayCompletedQuests;
