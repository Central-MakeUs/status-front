import classNames from 'classnames/bind';
import styles from './CompletedQuestList.module.scss';
import type { CompletedQuest } from '@/types/quest';
import {
  getSubQuestFrequencyLabel,
  SUB_QUEST_DIFFICULTY,
} from '@/constants/quest';

const cx = classNames.bind(styles);

const CompletedQuestList = ({ quest }: { quest: CompletedQuest }) => {
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
