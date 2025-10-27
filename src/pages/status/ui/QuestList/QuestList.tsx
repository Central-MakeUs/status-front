import { QuestItem } from '@/pages/status/ui/QuestItem/QuestItem';
import classNames from 'classnames/bind';
import styles from './QuestList.module.scss';
import type { UsersSubQuest } from '@/entities/user-quest/model/user-quest';

const cx = classNames.bind(styles);

export const QuestList = ({
  quests,
  className,
  onClick,
}: {
  quests: UsersSubQuest[];
  className?: string;
  onClick: (quest: UsersSubQuest) => void;
}) => {
  if (quests.length === 0) return null;

  return (
    <div className={cx('container')}>
      <div className={cx('header', className)}>오늘의 퀘스트</div>
      {quests.map((quest) => (
        <QuestItem
          subQuestInfo={quest.subQuestInfo}
          key={quest.subQuestInfo.id}
          repeatCnt={quest.repeatCnt}
          essential={quest.essential}
          onClick={() => onClick(quest)}
        />
      ))}
    </div>
  );
};
