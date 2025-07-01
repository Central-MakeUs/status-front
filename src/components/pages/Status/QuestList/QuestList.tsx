import { QuestItem } from './QuestItem/QuestItem';
// components/QuestItem/QuestItem.tsx
import classNames from 'classnames/bind';
import styles from './QuestList.module.scss'; // 올바른 스타일 파일 경로로 수정

const cx = classNames.bind(styles);
interface QuestItemProps {
  title: string;
  deadline: string;
  totalDays: number;
  progress: number;
}

export const QuestList = ({ quests }: { quests: QuestItemProps[] }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>진행 중인 퀘스트</div>
      {quests.map((quest, idx) => (
        <QuestItem key={idx} {...quest} />
      ))}
    </div>
  );
};
