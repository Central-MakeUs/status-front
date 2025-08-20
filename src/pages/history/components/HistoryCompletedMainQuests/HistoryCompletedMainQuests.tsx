import { useId } from 'react';
import { getWeeksDifference } from '@/utils/date';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { MAIN_QUEST_STATUS } from '@/constants/quest';

import type { UserCompletedMainQuests } from '@/types/quest';

import classNames from 'classnames/bind';
import styles from './HistoryCompletedMainQuests.module.scss';

const cx = classNames.bind(styles);

interface HistoryCompletedMainQuestsProps {
  mainQuests: UserCompletedMainQuests[];
}

export const HistoryCompletedMainQuests = ({
  mainQuests,
}: HistoryCompletedMainQuestsProps) => {
  const progressBarId = useId();

  if (mainQuests.length === 0) {
    return null;
  }

  return (
    <div className={cx('history-quests')}>
      <h3 className={cx('history-quests-title')}>완료한 메인퀘스트</h3>

      <ul className={cx('main-quest-list')}>
        {mainQuests.map((quest) => (
          <li key={quest.id} className={cx('main-quest-item')}>
            <div className={cx('main-quest-status-cover')}>
              <span
                className={cx('main-quest-status', {
                  'is-completed': quest.status === MAIN_QUEST_STATUS.COMPLETED,
                })}
              >
                {quest.status === MAIN_QUEST_STATUS.COMPLETED
                  ? '[성공]'
                  : '[실패]'}
              </span>
              <span className={cx('main-quest-date')}>
                기한_{quest.endDate} (총
                {getWeeksDifference(quest.startDate, quest.endDate)}
                주)
              </span>
            </div>
            <strong className={cx('main-quest-title')}>{quest.title}</strong>
            <ul className={cx('reward-list')}>
              {quest.attributes?.map((attribute) => (
                <li key={attribute.id} className={cx('reward-item')}>
                  <AttributeIcon id={attribute.id} />
                  <span className={cx('reward-text')}>+{attribute.exp}xp</span>
                </li>
              ))}
            </ul>
            <div className={cx('progress-bar-wrapper')}>
              <span
                id={`${progressBarId}-${quest.id}`}
                className={cx('progress-bar-text')}
              >
                최종 달성률 {quest.progress}%
              </span>
              <div
                role="progressbar"
                aria-valuenow={quest.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-labelledby={`${progressBarId}-${quest.id}`}
                className={cx('progress-bar')}
                style={
                  {
                    '--progress-bar-percentage': `${quest.progress}%`,
                  } as React.CSSProperties
                }
              />
            </div>
            <Link
              to={`${PAGE_PATHS.HISTORY_DETAIL.replace(':id', quest.id.toString())}`}
              className={cx('main-quest-detail')}
              state={quest.status}
            >
              <span className={cx('sr-only')}>상세 보기</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
