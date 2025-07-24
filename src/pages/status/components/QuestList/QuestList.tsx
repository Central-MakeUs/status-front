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
  onClick: (quest: UserSubQuest) => void;
}) => {
  return (
    <div className={cx('container', className)}>
      <div className={cx('header')}>오늘의 퀘스트</div>
      {quests.map((quest) => (
        <QuestItem key={quest.id} {...quest} onClick={() => onClick(quest)} />
      ))}
    </div>
  );
};
