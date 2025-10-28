import { useParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './history-detail-page.module.scss';
import { Header } from '@/widgets/global-header/ui/header';
import { getWeeksDifference } from '@/shared/lib/date';
import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';
import { useGetUsersMainQuest } from '@/entities/user-quest/api/use-get-user-main-quest';
import { StatusDetailBottomSheet } from '@/pages/status/ui/status-bottom-sheet/status-bottom-sheet';
import { useGetUsersAttributes } from '@/entities/user-quest/api/use-get-user-attributes';
import type { AttributeDTO } from '@/shared/api/attribute.dto';
import { useGetUsersCompletedLists } from '@/entities/user-quest/api/use-get-user-completed-lists';
import CompletedHistory from './ui/completed-history/completed-history';
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
