import { Link, useNavigate } from 'react-router-dom';
import { useGetUserMainQuests } from '@/api/hooks/quest/';
import { Header } from '@/components/ui/Header/Header';
import { QuestEmpty } from '@/pages/quest/components/QuestEmpty';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { getWeeksDifference } from '@/utils/date';

import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
import IconAdd from '@/assets/icons/icon-add.svg?react';

import classNames from 'classnames/bind';
import styles from './QuestPage.module.scss';

const cx = classNames.bind(styles);

export const QuestPage = () => {
  const navigate = useNavigate();
  // [TODO] auth store에서 사용자 정보 가져오기
  // const userId = '10';
  const { data } = useGetUserMainQuests();

  const handleAddQuest = () => {
    navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE);
  };

  const questCount = data?.length || 0;
  const canAddQuest = questCount < 3;

  return (
    <>
      <Header title={`내 퀘스트 (${questCount}/3)`} />
      <main className="main">
        {questCount === 0 ? (
          <QuestEmpty />
        ) : (
          <ul className={cx('main-quest-list')}>
            {data?.map((quest) => (
              <li key={quest.id} className={cx('main-quest-item')}>
                <span className={cx('main-quest-date')}>
                  기한_{quest.endDate} (총
                  {getWeeksDifference(quest.startDate, quest.endDate)}
                  주)
                </span>
                <strong className={cx('main-quest-title')}>
                  {quest.title}
                </strong>
                <ul className={cx('reward-list')}>
                  {quest.attributes?.map((attribute) => (
                    <li key={attribute.id} className={cx('reward-item')}>
                      <AttributeIcon id={attribute.id} />
                      <span className={cx('reward-text')}>
                        +{attribute.exp}xp
                      </span>
                    </li>
                  ))}
                </ul>
                <div className={cx('progress-bar-wrapper')}>
                  <span className={cx('progress-bar-text')}>
                    {quest.progress}%
                  </span>
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
        )}
        {canAddQuest && (
          <button
            type="button"
            className={cx('button-add-quest')}
            onClick={handleAddQuest}
          >
            <span className={cx('text')}>새로운 퀘스트</span>
            <IconAdd className={cx('icon-add')} aria-hidden="true" />
          </button>
        )}
      </main>
    </>
  );
};

export default QuestPage;
