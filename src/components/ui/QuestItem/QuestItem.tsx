import classNames from 'classnames/bind';
import styles from './QuestItem.module.scss';
import type { UserSubQuest } from '@/types/quest';
import { getSubQuestFrequencyLabel } from '@/constants/quest';

const cx = classNames.bind(styles);

export const QuestItem = ({
  id,
  desc,
  defaultRepeat,
  frequency,
  repeatCnt,
  attributes,
  essential,
  onClick = () => {},
}: UserSubQuest & { onClick?: (id: string) => void }) => {
  return (
    <div className={cx('quest-item')}>
      <div className={cx('topRow')}>
        {essential && <span className={cx('essential')}>필수</span>}
        {frequency.includes('weekly') && (
          <span className={cx('remaining')}>
            (금주 {defaultRepeat - repeatCnt}회 남음)
          </span>
        )}
        {frequency.includes('monthly') && (
          <span className={cx('remaining')}>
            (이번달 {defaultRepeat - repeatCnt}회 남음)
          </span>
        )}
        <div className={cx('meta')}>
          <span className={cx('frequency')}>
            {getSubQuestFrequencyLabel(frequency)} |
          </span>
          {attributes.map((attr) => (
            <span key={attr.attributeId} className={cx('attribute')}>
              {attr.name}+{attr.exp}
            </span>
          ))}
        </div>
      </div>
      <div className={cx('desc')}>{desc}</div>
      <button className={cx('confirm')} onClick={() => onClick(id)}>
        인증하기
      </button>
    </div>
  );
};
