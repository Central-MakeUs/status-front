import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '@/shared/config/paths';
import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';
import { getWeeksDifference } from '@/shared/lib/date';
import { type UsersMainQuest } from '@/entities/user-quest/model/user-quest';
import { QuestEmpty } from './quest-empty';

import classNames from 'classnames/bind';
import styles from './quest-list.module.scss';

const cx = classNames.bind(styles);

interface QuestListProps {
  quests?: UsersMainQuest[];
}

export const QuestList = ({ quests }: QuestListProps) => {
  if (!quests) {
    return <QuestEmpty />;
  }

  return (
    <ul className={cx('main-quest-list')}>
      {quests.map((quest) => (
        <li key={quest.id} className={cx('main-quest-item')}>
          <span className={cx('main-quest-date')}>
            기한_{quest.endDate} (총{' '}
            {getWeeksDifference(quest.startDate, quest.endDate)}주)
          </span>
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
            <span className={cx('progress-bar-text')}>{quest.progress}%</span>
            <div
              role="progressbar"
              aria-valuenow={quest.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${quest.title} 진행 상태`}
              className={cx('progress-bar')}
              style={
                {
                  '--progress-bar-percentage': `${quest.progress}%`,
                } as React.CSSProperties
              }
            />
          </div>
          <Link
            to={`${PAGE_PATHS.QUEST_DETAIL.replace(':id', quest.id.toString())}`}
            className={cx('main-quest-detail')}
          >
            <span className={cx('sr-only')}>상세 보기</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
