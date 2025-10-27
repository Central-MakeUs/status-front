import { StatusHeader } from '@/pages/status/ui/status-header/status-header';
import { RadarChart } from '@/pages/status/ui/radar-chart/radar-chart';
import { QuestList } from '@/pages/status/ui/quest-list/quest-list';
import { useGetUsersAttributes } from '@/entities/user/api/use-get-user-attributes';
import { useGetUsersSubQuestsAll } from '@/entities/user-quest/api/use-get-user-sub-quests-all';
import { useState } from 'react';
import { StatusDetailBottomSheet } from './ui/status-bottom-sheet/status-bottom-sheet';
import TierLevelBottomSheet from './ui/tier-bottom-sheet/tier-bottom-sheet';
import type { UsersSubQuest } from '@/entities/user-quest/model/user-quest';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from '@/app/providers/paths';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/features/auth/model/auth-store';
import { TIER_TYPE } from '@/shared/config/tier';
import profileImageUrl from '@/assets/images/image-profile-default.svg';

const StatusPage = () => {
  const navigate = useNavigate();

  const { data: attributeDatas } = useGetUsersAttributes();
  const { data: quests } = useGetUsersSubQuestsAll();
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

  return (
    <>
      {user && (
        <StatusHeader
          nickname={user.nickname}
          tier={user.tier.tier}
          level={user.tier.level}
          profileImageUrl={profileImageUrl}
          onClick={() => {
            setIsLevelBottomSheetOpen(true);
          }}
        />
      )}
      <main className="main">
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
        {quests && (
          <QuestList
            quests={quests}
            onClick={(quest: UsersSubQuest) => {
              navigate(
                `${PAGE_PATHS.QUEST_DETAIL.replace(':id', quest.mainQuestId?.toString() || '')}`,
                { state: { quest: quest } }
              );
            }}
          />
        )}
      </main>
      <TierLevelBottomSheet
        isOpen={isLevelBottomSheetOpen}
        onClose={() => setIsLevelBottomSheetOpen(false)}
        tier={user?.tier.tier || TIER_TYPE.BRONZE}
        level={user?.tier.level || 1}
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
