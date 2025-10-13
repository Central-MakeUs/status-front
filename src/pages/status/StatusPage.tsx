import { Header } from '@/pages/status/components/Header/Header';
import { RadarChart } from '@/pages/status/components/RadarChart/RadarChart';
import { QuestList } from '@/pages/status/components/QuestList/QuestList';
import { useGetUserAttributes } from '@/api/hooks/attribute';
import { useGetUserSubQuestsAll } from '@/api/hooks/quest/useGetUserSubQuestsAll';
import { useState } from 'react';
import { StatusDetailBottomSheet } from './components/BottomSheet/StatusBottomSheet/StatusBottomSheet';
import TierLevelBottomSheet from './components/BottomSheet/TierBottomSheet/TierBottomSheet';
import type { UserSubQuest } from '@/types/quest';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from '@/app/providers/paths';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/stores/authStore';
import { TIER_TYPE } from '@/entities/tier/config/constants';
import profileImageUrl from '@/assets/images/image-profile-default.svg';

const StatusPage = () => {
  const navigate = useNavigate();

  const { data: attributeDatas } = useGetUserAttributes();
  const { data: quests } = useGetUserSubQuestsAll();
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
        <Header
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
            onClick={(quest: UserSubQuest) => {
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
