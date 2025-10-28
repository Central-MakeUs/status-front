import type { CompletedQuest } from '@/entities/user-quest/model/user-quest';
import type { UsersSubQuest } from '@/entities/user-quest/model/user-quest';
import type { SubQuestDifficulty } from '@/entities/quest-template/model/quest-template';
import {
  getSubQuestFrequencyLabel,
  SUB_QUEST_DIFFICULTY,
} from '@/shared/config/quest-template';

import IconEdit from '@/assets/icons/icon-edit.svg?react';

import classNames from 'classnames/bind';
import styles from './completed-quest-list.module.scss';
const cx = classNames.bind(styles);

const CompletedQuestList = ({
  quest,
  onClick,
}: {
  quest: CompletedQuest;
  onClick: (
    quest: UsersSubQuest,
    difficulty: SubQuestDifficulty,
    memo: string,
    logId: number
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
            {getSubQuestFrequencyLabel(
              quest.userSubQuest.subQuestInfo.frequencyType
            )}{' '}
            |
            {quest.userSubQuest.subQuestInfo.attributes.map((attr) => (
              <span key={attr.id} className={cx('attribute')}>
                {attr.name} +{attr.exp}
              </span>
            ))}
          </div>
          <div className={cx('title')}>
            {quest.userSubQuest.subQuestInfo.desc}
          </div>
        </div>
        <button className={cx('edit-btn')}>
          <IconEdit
            onClick={() =>
              onClick(
                quest.userSubQuest,
                difficulty.value,
                quest.log.memo,
                quest.log.id
              )
            }
          />
        </button>
      </div>
      <div className={cx('card-content')}>
        <span
          key={difficulty.value}
          className={cx('quest-report-radio', difficulty.value.toLowerCase())}
        >
          {difficulty.label}
        </span>
        <div className={cx('comment')}>{quest.log.memo}</div>
      </div>
    </div>
  );
};

export default CompletedQuestList;
