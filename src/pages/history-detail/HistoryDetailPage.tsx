import { useParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HistoryDetailPage.module.scss';
import { Header } from '@/widgets/global-header/ui/Header';
import { getWeeksDifference } from '@/shared/lib/date';
import { AttributeIcon } from '@/shared/ui/AttributeIcon/AttributeIcon';
import { useGetUsersMainQuest } from '@/entities/users-main-quest/api/useGetUsersMainQuest';
import { StatusDetailBottomSheet } from '@/pages/status/ui/StatusBottomSheet/StatusBottomSheet';
import { useGetUsersAttributes } from '@/entities/users-attribute/api/useGetUsersAttributes';
import type { AttributeDTO } from '@/entities/users-attribute/api/dto';
import { useGetUsersCompletedLists } from '@/entities/users-sub-quest/api/useGetUsersCompletedLists';
import CompletedHistory from './ui/CompletedHistory/CompletedHistory';
const cx = classNames.bind(styles);

const QuestDetailPage = () => {
  const { id: mainQuestId } = useParams();
  const { data: quest } = useGetUsersMainQuest(Number(mainQuestId));
  const { data: completedHistory } = useGetUsersCompletedLists(
    Number(mainQuestId)
  );
  const { data: attributeDatas } = useGetUsersAttributes();

  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [selectedStatusKey, setSelectedStatusKey] = useState<number>(101);
  const selectedAttribute = attributeDatas?.find(
    (attr) => attr.attributeId === selectedStatusKey
  );
  return (
    <>
      <Header>
        <Header.Title>퀘스트 상세</Header.Title>
        <Header.BackButton />
      </Header>
      <main className="main">
        {quest && (
          <div className={cx('quest-detail')}>
            <span className={cx('main-quest-date')}>
              <span className={cx('main-quest-content')}>
                <span
                  className={cx('main-quest-status', {
                    'is-completed': quest.status === 'COMPLETED',
                  })}
                >
                  {quest.status === 'COMPLETED' ? '[성공]' : '[실패]'}
                </span>
                &nbsp;
                {quest.startDate}_{quest.endDate} (총 &nbsp;
                {getWeeksDifference(quest.startDate, quest.endDate)}
                주)
              </span>
            </span>
            <strong className={cx('main-quest-title')}>{quest.title}</strong>
            <ul className={cx('reward-list')}>
              {quest.attributes?.map((attribute: AttributeDTO) => (
                <li key={attribute.id} className={cx('reward-item')}>
                  <button
                    type="button"
                    className={cx('button-reward')}
                    onClick={() => {
                      setIsStatusBottomSheetOpen(true);
                      setSelectedStatusKey(attribute.id);
                    }}
                  >
                    <AttributeIcon id={attribute.id} />
                    <span className={cx('reward-text')}>
                      +{attribute.exp}xp
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={cx('quest-component')}>
          <CompletedHistory completedHistory={completedHistory || []} />
        </div>
      </main>

      {selectedAttribute && (
        <StatusDetailBottomSheet
          isOpen={isStatusBottomSheetOpen}
          onClose={() => setIsStatusBottomSheetOpen(false)}
          statusKey={selectedStatusKey}
          attribute={selectedAttribute}
        />
      )}
    </>
  );
};

export default QuestDetailPage;
