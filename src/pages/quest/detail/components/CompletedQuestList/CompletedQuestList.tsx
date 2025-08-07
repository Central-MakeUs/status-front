import classNames from 'classnames/bind';
import styles from './CompletedQuestList.module.scss';
import type {
  SubQuestDifficulty,
  CompletedQuest,
  UserSubQuest,
} from '@/types/quest';
import {
  getSubQuestFrequencyLabel,
  SUB_QUEST_DIFFICULTY,
} from '@/constants/quest';

import IconEdit from '@/assets/icons/icon-edit.svg?react';
const cx = classNames.bind(styles);

const CompletedQuestList = ({
  quest,
  onClick,
}: {
  quest: CompletedQuest;
  onClick: (
    event: React.MouseEvent,
    quest: UserSubQuest,
    difficulty: SubQuestDifficulty,
    memo: string
  ) => void;
}) => {
  const difficulty =
    Object.values(SUB_QUEST_DIFFICULTY).find(
      (el) => el.value === quest.log.difficulty
    ) ?? SUB_QUEST_DIFFICULTY['EASY'];

  return (
    <div className={cx('card')}>
      <div className={cx('card-header')}>
        <div className={cx('top-row')}>
          <div className={cx('attributes-row')}>
            {getSubQuestFrequencyLabel(quest.userSubQuestInfo.frequencyType)} |
            {quest.userSubQuestInfo.attributes.map((attr) => (
              <span key={attr.id} className={cx('attribute')}>
                {attr.name} +{attr.exp}
              </span>
            ))}
          </div>
          <div className={cx('title')}>{quest.userSubQuestInfo.desc}</div>
        </div>
        <button className={cx('edit-btn')}>
          <IconEdit
            onClick={(event) =>
              onClick(event, quest, difficulty.value, quest.log.memo)
            }
          />
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
        <div className={cx('comment')}>{quest.log.memo}</div>
      </div>
    </div>
  );
};

export default CompletedQuestList;
