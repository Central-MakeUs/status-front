import { SubQuestCard } from './sub-quest-card';
import type { UsersSubQuest } from '../model/user-quest';

import classNames from 'classnames/bind';
import styles from './today-sub-quest-list.module.scss';

const cx = classNames.bind(styles);

interface TodaySubQuestListProps {
  className?: string;
  subQuests: UsersSubQuest[];
  onVerify: (subQuest: UsersSubQuest) => void;
}

export const TodaySubQuestList = ({
  className,
  subQuests,
  onVerify,
}: TodaySubQuestListProps) => {
  return (
    <ul className={cx('sub-quest-list', className)}>
      {subQuests.map((subQuest) => (
        <li key={subQuest.subQuestInfo.id} className={cx('sub-quest-item')}>
          <SubQuestCard subQuest={subQuest} onVerify={onVerify} />
        </li>
      ))}
    </ul>
  );
};
