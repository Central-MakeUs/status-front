import { useParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HistoryDetailPage.module.scss';
import { Header } from '@/shared/ui/Header/Header';
import { getWeeksDifference } from '@/shared/lib/date';
import { AttributeIcon } from '@/shared/ui/AttributeIcon/AttributeIcon';
import { useGetUserMainQuest } from '@/entities/quest/api/useGetUserMainQuest';
import { StatusDetailBottomSheet } from '@/pages/status/components/BottomSheet/StatusBottomSheet/StatusBottomSheet';
import { useGetUserAttributes } from '@/entities/attribute/api/useGetUserAttributes';
import type { AttributeDTO } from '@/entities/attribute/api/dto';
import { useGetUserCompletedLists } from '@/entities/quest/api/useGetUserCompletedLists';
import CompletedHistory from './CompletedHistory/CompletedHistory';
const cx = classNames.bind(styles);

const QuestDetailPage = () => {
  const { id: mainQuestId } = useParams();
  const { data: quest } = useGetUserMainQuest(Number(mainQuestId));
  const { data: completedHistory } = useGetUserCompletedLists(
    Number(mainQuestId)
  );
  const { data: attributeDatas } = useGetUserAttributes();

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
