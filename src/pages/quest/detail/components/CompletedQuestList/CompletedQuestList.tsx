import classNames from 'classnames/bind';
import styles from './CompletedQuestList.module.scss';
import type { TodayCompletedQuest } from '@/types/quest';
import { SUB_QUEST_DIFFICULTY } from '@/constants/quest';

import IconEdit from '@/assets/icons/icon-edit.svg?react';
const cx = classNames.bind(styles);

const CompletedQuestList = ({ quest }: { quest: TodayCompletedQuest }) => {
  const difficulty =
    Object.values(SUB_QUEST_DIFFICULTY).find(
      (el) => el.value === quest.difficulty
    ) ?? SUB_QUEST_DIFFICULTY['EASY'];

  return (
    <div className={cx('card')}>
      <div className={cx('card-header')}>
        <div className={cx('top-row')}>
          {quest.frequency} | {quest.attribute} +{quest.xp}xp
          <div className={cx('title')}>{quest.title}</div>
        </div>
        <button className={cx('edit-btn')}>
          <IconEdit />
        </button>
      </div>
      <div className={cx('card-content')}>
        <span
          key={difficulty.value}
          role="radio"
          className={cx('quest-report-radio', difficulty.value)}
        >
          {difficulty.label}
        </span>
        <div className={cx('comment')}>{quest.comment}</div>
      </div>
    </div>
  );
};

export default CompletedQuestList;
