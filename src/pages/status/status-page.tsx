import { StatusHeader } from '@/pages/status/ui/status-header/status-header';
import { RadarChart } from '@/pages/status/ui/radar-chart/radar-chart';
import { TodaySubQuestList } from '@/entities/user-quest/ui/today-sub-quest-list';
import { useGetUsersAttributes } from '@/entities/user-quest/api/use-get-user-attributes';
import { useGetUserTodaySubQuests } from '@/entities/user-quest/api/use-get-user-today-sub-quests';
import { useState } from 'react';
import { AttributeDetailBottomSheet } from '@/widgets/attribute-detail-bottom-sheet/ui/attribute-detail-bottom-sheet';
import TierLevelBottomSheet from './ui/tier-level-bottom-sheet/tier-level-bottom-sheet';
import type {
  UserAttribute,
  UsersSubQuest,
} from '@/entities/user-quest/model/user-quest';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from '@/shared/config/paths';

import classNames from 'classnames/bind';
import styles from './status-page.module.scss';

const cx = classNames.bind(styles);

const StatusPage = () => {
  const navigate = useNavigate();

  const { data: userAttributes } = useGetUsersAttributes();
  const { data: todaySubQuests } = useGetUserTodaySubQuests();

  const [isLevelBottomSheetOpen, setIsLevelBottomSheetOpen] = useState(false);
  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);

  const [selectedAttribute, setSelectedAttribute] =
    useState<UserAttribute | null>(null);

  const handleSubQuestVerify = (subQuest: UsersSubQuest) => {
    navigate(
      `${PAGE_PATHS.QUEST_DETAIL.replace(':id', subQuest.mainQuestId.toString())}`,
      { state: { subQuest: subQuest } }
    );
  };

  return (
    <>
      <StatusHeader
        onShowTierLevel={() => {
          setIsLevelBottomSheetOpen(true);
        }}
      />
      <main className={cx('main', 'status-page')}>
        {userAttributes && (
          <>
            <RadarChart
              attributeDatas={userAttributes}
              onClick={(attribute: UserAttribute) => {
                setSelectedAttribute(attribute);
                setIsStatusBottomSheetOpen(true);
              }}
            />
          </>
        )}
        {todaySubQuests && (
          <>
            <h2 className={cx('page-title')}>오늘의 퀘스트</h2>
            <TodaySubQuestList
              className={cx('today-sub-quest-list')}
              subQuests={todaySubQuests}
              onVerify={handleSubQuestVerify}
            />
          </>
        )}
      </main>
      <TierLevelBottomSheet
        isOpen={isLevelBottomSheetOpen}
        onClose={() => setIsLevelBottomSheetOpen(false)}
      />
      {selectedAttribute && (
        <AttributeDetailBottomSheet
          isOpen={isStatusBottomSheetOpen}
          onClose={() => {
            setIsStatusBottomSheetOpen(false);
          }}
          selectedAttribute={selectedAttribute}
        />
      )}
    </>
  );
};

export default StatusPage;
