import { QuestItem } from '../../../../components/ui/QuestItem/QuestItem';
// components/QuestItem/QuestItem.tsx
import classNames from 'classnames/bind';
import styles from './QuestList.module.scss';
import type { UserSubQuest } from '@/types/quest';

const cx = classNames.bind(styles);

export const QuestList = ({
  quests,
  className,
  onClick,
}: {
  quests: UserSubQuest[];
  className?: string;
  onClick: (event: React.MouseEvent, quest: UserSubQuest) => void;
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
          onClick={(event) => onClick(event, quest)}
        />
      ))}
    </div>
  );
};
