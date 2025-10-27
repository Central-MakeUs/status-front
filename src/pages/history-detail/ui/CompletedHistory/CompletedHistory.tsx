import classNames from 'classnames/bind';
import styles from './CompletedHistory.module.scss';
import CompletedQuestList from '../CompletedQuestList/CompletedQuestList';
import { useState } from 'react';

import IconExpandLess from '@/assets/icons/icon-expand-less.svg?react';
import IconExpandMore from '@/assets/icons/icon-expand-more.svg?react';
import type { UsersCompletedHistory } from '@/entities/user-quest/model/user-quest';
const cx = classNames.bind(styles);

const CompletedHistory = ({
  completedHistory,
}: {
  completedHistory: UsersCompletedHistory[];
}) => {
  const [openDate, setOpenDate] = useState<string | null>(null);

  const handleToggle = (date: string) => {
    setOpenDate((prev) => (prev === date ? null : date));
  };

  if (completedHistory.length === 0) return null;

  return (
    <>
      <main className="main">
        <div className={cx('container')}>
          <div className={cx('header')}>완료 히스토리</div>
          <div className={cx('date-container')}>
            {completedHistory &&
              completedHistory.map(({ date, logs }) => (
                <div key={date}>
                  <button
                    type="button"
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
                  </button>
                  {openDate === date &&
                    logs &&
                    logs.map((quest) => (
                      <CompletedQuestList
                        key={quest.userSubQuest.subQuestInfo.id}
                        quest={quest}
                      />
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
