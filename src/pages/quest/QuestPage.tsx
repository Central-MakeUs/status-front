import { useGetUserQuests } from '@/api/hooks/quest/useGetUserQuests';
import { Header } from '@/components/ui/Header/Header';
import { QuestEmpty } from '@/pages/quest/components/QuestEmpty';
import IconAdd from '@/assets/icons/icon-add.svg?react';

import classNames from 'classnames/bind';
import styles from './QuestPage.module.scss';

const cx = classNames.bind(styles);

export const QuestPage = () => {
  // [TODO] auth store에서 사용자 정보 가져오기
  const userId = '1';
  const { data: quests } = useGetUserQuests(userId);

  const handleAddQuest = () => {
    // [TODO] 퀘스트 생성 페이지 이동
  };

  return (
    <>
      <Header title="퀘스트" />
      <main className="main">
        {quests?.length === 0 ? (
          <QuestEmpty />
        ) : (
          // [TODO] 디자인 확정 후 스타일링
          <ul className={cx('quest-list')}>
            {quests?.map((quest) => (
              <li key={quest.id} className={cx('quest-item')}>
                <ul className={cx('status-list')}>
                  {quest.rewards.map((reward) => (
                    <li className={cx('status-item')}>{reward.exp}</li>
                  ))}
                  <div className={cx('quest-title')}>{quest.title}</div>
                </ul>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className={cx('button-add-quest')}
          onClick={handleAddQuest}
        >
          <span className={cx('text')}>새로운 퀘스트</span>
          <IconAdd className={cx('icon-add')} aria-hidden="true" />
        </button>
      </main>
    </>
  );
};
