import CompletedQuestList from '../CompletedQuestList/CompletedQuestList';

import classNames from 'classnames/bind';
import styles from './TodayCompletedQuests.module.scss';
import type {
  SubQuestDifficulty,
  CompletedQuest,
  UserSubQuest,
} from '@/types/quest';
const cx = classNames.bind(styles);

const TodayCompletedQuests = ({
  quests,
  onClick,
}: {
  quests: CompletedQuest[];
  onClick: (
    quest: UserSubQuest,
    difficulty: SubQuestDifficulty,
    memo: string,
    logId: number
  ) => void;
}) => {
  if (quests.length === 0) return null;

  return (
    <>
      <main className="main">
        <div className={cx('container')}>
          <div className={cx('header')}>오늘 완료한 퀘스트</div>
          {quests &&
            quests.map((quest) => (
              <CompletedQuestList
                key={quest.userSubQuest.subQuestInfo.id}
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
