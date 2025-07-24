import classNames from 'classnames/bind';
import styles from './CompletedHistory.module.scss';
import CompletedQuestList from '../CompletedQuestList/CompletedQuestList';
import { useState } from 'react';
import { useGetUserCompletedLists } from '@/api/hooks/quest/UseGetUserCompletedHistory';

import IconExpandLess from '@/assets/icons/icon-expand-less.svg?react';
import IconExpandMore from '@/assets/icons/icon-expand-more.svg?react';
const cx = classNames.bind(styles);

const CompletedHistory = ({ userId }: { userId: string }) => {
  const { data: completedHistory } = useGetUserCompletedLists(userId);

  const [openDate, setOpenDate] = useState<string | null>(null);

  const handleToggle = (date: string) => {
    setOpenDate((prev) => (prev === date ? null : date));
  };

  return (
    <>
      <main className="main">
        <div className={cx('container')}>
          <div className={cx('header')}>완료 히스토리</div>
          <div className={cx('date-container')}>
            {completedHistory &&
              completedHistory.map(({ date, quests }) => (
                <div key={date}>
                  <div
                    className={cx('date-row', { open: openDate === date })}
                    onClick={() => handleToggle(date)}
                  >
                    <span>{date}</span>
                    <span>
                      {openDate === date ? (
                        <IconExpandLess
                          className={cx('select-button-icon')}
                          aria-hidden="true"
                        />
                      ) : (
                        <IconExpandMore
                          className={cx('select-button-icon')}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </div>
                  {openDate === date &&
                    quests &&
                    quests.map((quest) => (
                      <CompletedQuestList key={quest.id} quest={quest} />
                    ))}
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default CompletedHistory;
