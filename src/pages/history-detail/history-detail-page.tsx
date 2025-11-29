import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '@/widgets/global-header/ui/header';
import { getWeeksDifference } from '@/shared/lib/date';
import { AttributeIcon } from '@/shared/ui/attribute-icon/attribute-icon';
import { useGetUsersMainQuest } from '@/entities/user-quest/api/use-get-user-main-quest';
import { AttributeDetailBottomSheet } from '@/widgets/attribute-detail-bottom-sheet/ui/attribute-detail-bottom-sheet';
import { useGetUsersAttributes } from '@/entities/user-quest/api/use-get-user-attributes';
import { useGetUsersCompletedLists } from '@/entities/user-quest/api/use-get-user-completed-lists';
import CompletedHistory from './ui/completed-history/completed-history';
import type { Attribute } from '@/entities/quest-template/model/quest-template';
import type { UserAttribute } from '@/entities/user-quest/model/user-quest';

import classNames from 'classnames/bind';
import styles from './history-detail-page.module.scss';

const cx = classNames.bind(styles);

const QuestDetailPage = () => {
  const { id: mainQuestId } = useParams();
  const { data: quest } = useGetUsersMainQuest(Number(mainQuestId));
  const { data: completedHistory } = useGetUsersCompletedLists(
    Number(mainQuestId)
  );
  const { data: userAttributes } = useGetUsersAttributes();

  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] =
    useState<UserAttribute | null>(null);

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
              {quest.attributes?.map((attribute: Attribute) => (
                <li key={attribute.id} className={cx('reward-item')}>
                  <button
                    type="button"
                    className={cx('button-reward')}
                    onClick={() => {
                      setIsStatusBottomSheetOpen(true);
                      setSelectedAttribute(
                        userAttributes?.find(
                          (userAttribute) =>
                            userAttribute.attributeId === attribute.id
                        ) ?? null
                      );
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
        <AttributeDetailBottomSheet
          isOpen={isStatusBottomSheetOpen}
          onClose={() => setIsStatusBottomSheetOpen(false)}
          selectedAttribute={selectedAttribute}
        />
      )}
    </>
  );
};

export default QuestDetailPage;
