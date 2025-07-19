import { QuestItem } from '../../../../components/ui/QuestItem/QuestItem';
// components/QuestItem/QuestItem.tsx
import classNames from 'classnames/bind';
import styles from './QuestList.module.scss';
import type { UserSubQuest } from '@/types/quest';

const cx = classNames.bind(styles);

export const QuestList = ({ quests }: { quests: UserSubQuest[] }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>오늘의 퀘스트</div>
      {quests.map((quest, idx) => (
        <QuestItem key={idx} {...quest} />
      ))}
    </div>
  );
};
