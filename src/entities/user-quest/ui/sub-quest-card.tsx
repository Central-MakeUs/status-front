import {
  getSubQuestFrequencyLabel,
  getSubQuestPeriodLabel,
} from '@/shared/config/quest-template';
import type { UsersSubQuest } from '../model/user-quest';

import classNames from 'classnames/bind';
import styles from './sub-quest-card.module.scss';

const cx = classNames.bind(styles);

interface SubQuestListItemProps {
  subQuest: UsersSubQuest;
  onVerify: (subQuest: UsersSubQuest) => void;
}

export const SubQuestCard = ({ subQuest, onVerify }: SubQuestListItemProps) => {
  const { subQuestInfo, repeatCnt, essential } = subQuest;
  const { frequencyType, attributes, desc } = subQuestInfo;

  const periodLabel = getSubQuestPeriodLabel(frequencyType);

  return (
    <div className={cx('sub-quest-card')}>
      <div className={cx('sub-quest-info')}>
        {essential && <strong className={cx('essential')}>필수</strong>}
        {periodLabel && (
          <span className={cx('remaining')}>
            ({periodLabel} {repeatCnt}회 남음)
          </span>
        )}
        <span className={cx('frequency')}>
          {getSubQuestFrequencyLabel(frequencyType)}
        </span>
        {attributes.map((attr) => (
          <span key={attr.id} className={cx('attribute')}>
            {attr.name}+{attr.exp}
          </span>
        ))}
      </div>
      <p className={cx('description')}>{desc}</p>
      <button
        type="button"
        className={cx('button-verify')}
        onClick={() => onVerify(subQuest)}
      >
        인증하기
      </button>
    </div>
  );
};
