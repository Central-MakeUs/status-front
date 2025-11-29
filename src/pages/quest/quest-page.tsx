import { useNavigate } from 'react-router-dom';
import { useGetUsersMainQuests } from '@/entities/user-quest/api/use-get-user-main-quests';
import { Header } from '@/widgets/global-header/ui/header';
import { QuestList } from './ui/quest-list';
import { PAGE_PATHS } from '@/shared/config/paths';
import { MAX_USERS_MAIN_QUEST_COUNT } from '@/entities/user-quest/config/user-quest';

import IconAdd from '@/assets/icons/icon-add.svg?react';

import classNames from 'classnames/bind';
import styles from './quest-page.module.scss';

const cx = classNames.bind(styles);

export const QuestPage = () => {
  const navigate = useNavigate();
  const { data: quests } = useGetUsersMainQuests();

  const handleAddQuest = () => {
    navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE);
  };

  const questCount = quests?.length || 0;
  const canAddQuest = questCount < MAX_USERS_MAIN_QUEST_COUNT;

  return (
    <>
      <Header>
        <Header.Title>
          {`내 퀘스트 (${questCount}/${MAX_USERS_MAIN_QUEST_COUNT})`}
        </Header.Title>
      </Header>
      <main className="main">
        <QuestList quests={quests} />
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
