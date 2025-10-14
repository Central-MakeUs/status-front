import classNames from 'classnames/bind';
import styles from './QuestItem.module.scss';
import type { UserSubQuest } from '@/entities/quest/model/types';
import { getSubQuestFrequencyLabel } from '@/entities/quest/config/constants';

const cx = classNames.bind(styles);

export const QuestItem = ({
  subQuestInfo: {
    id,
    desc,
    frequencyType,
    attributes,
    actionUnitType,
    actionUnitNum,
  },
  repeatCnt,
  essential,
  onClick = () => {},
}: UserSubQuest & {
  onClick?: (id: string) => void;
}) => {
  return (
    <div className={cx('quest-item')}>
      <div className={cx('top-row')}>
        {essential && <span className={cx('essential')}>필수</span>}
        {frequencyType.includes('weekly') && (
          <span className={cx('remaining')}>
            (금주 {actionUnitNum - repeatCnt} {actionUnitType} 남음)
          </span>
        )}
        {frequencyType.includes('monthly') && (
          <span className={cx('remaining')}>
            (이번달 {actionUnitNum - repeatCnt} {actionUnitType} 남음)
          </span>
        )}
        <div className={cx('meta')}>
          <span className={cx('frequency')}>
            {getSubQuestFrequencyLabel(frequencyType)} |
          </span>
          {attributes.map((attr) => (
            <span key={attr.id} className={cx('attribute')}>
              {attr.name}+{attr.exp}
            </span>
          ))}
        </div>
      </div>
      <div className={cx('desc')}>{desc}</div>
      <button className={cx('confirm')} onClick={() => onClick(id.toString())}>
        인증하기
      </button>
    </div>
  );
};
