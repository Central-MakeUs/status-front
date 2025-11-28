import { StatusHeader } from '@/pages/status/ui/status-header/status-header';
import { RadarChart } from '@/pages/status/ui/radar-chart/radar-chart';
import { TodaySubQuestList } from '@/entities/user-quest/ui/today-sub-quest-list';
import { useGetUsersAttributes } from '@/entities/user-quest/api/use-get-user-attributes';
import { useGetUserTodaySubQuests } from '@/entities/user-quest/api/use-get-user-today-sub-quests';
import { useState } from 'react';
import { StatusDetailBottomSheet } from './ui/status-bottom-sheet/status-bottom-sheet';
import TierLevelBottomSheet from './ui/tier-level-bottom-sheet/tier-level-bottom-sheet';
import type { UsersSubQuest } from '@/entities/user-quest/model/user-quest';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from '@/shared/config/paths';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/features/auth/model/auth-store';
import profileImageUrl from '@/assets/images/image-profile-default.svg';

import classNames from 'classnames/bind';
import styles from './status-page.module.scss';

const cx = classNames.bind(styles);

const StatusPage = () => {
  const navigate = useNavigate();

  const { data: attributeDatas } = useGetUsersAttributes();
  const { data: todaySubQuests } = useGetUserTodaySubQuests();
  const [isLevelBottomSheetOpen, setIsLevelBottomSheetOpen] = useState(false);
  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);

  const [selectedStatusKey, setSelectedStatusKey] = useState<number>(101);
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );
  const selectedAttribute = attributeDatas?.find(
    (attr) => attr.attributeId === selectedStatusKey
  );

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
        {attributeDatas && user && (
          <RadarChart
            attributeDatas={attributeDatas}
            profileImage={profileImageUrl}
            onClick={(key: number) => {
              setSelectedStatusKey(key);
              setIsStatusBottomSheetOpen(true);
            }}
          />
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
        <StatusDetailBottomSheet
          isOpen={isStatusBottomSheetOpen}
          onClose={() => {
            setIsStatusBottomSheetOpen(false);
            setSelectedStatusKey(101);
          }}
          statusKey={selectedStatusKey}
          attribute={selectedAttribute}
        />
      )}
    </>
  );
};

export default StatusPage;
