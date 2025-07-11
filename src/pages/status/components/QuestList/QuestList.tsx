import { QuestItem } from './QuestItem/QuestItem';
// components/QuestItem/QuestItem.tsx
import classNames from 'classnames/bind';
import styles from './QuestList.module.scss';
import type { Quest } from '@/types/quest';

const cx = classNames.bind(styles);

export const QuestList = ({ quests }: { quests: Quest[] }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>진행 중인 퀘스트</div>
      {quests.map((quest, idx) => (
        <QuestItem key={idx} {...quest} />
      ))}
    </div>
  );
};
