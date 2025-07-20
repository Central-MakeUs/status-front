import { Header } from '@/pages/status/components/Header/Header';
import { RadarChart } from '@/pages/status/components/RadarChart/RadarChart';
import { QuestList } from '@/pages/status/components/QuestList/QuestList';
import { useGetUserInfo } from '@/api/hooks/user/useGetUserInfo';
import { useGetStatusList } from '@/api/hooks/status/useGetStatus';
import { useGetUserSubQuests } from '@/api/hooks/quest/useGetUserSubQuests';
import { useState } from 'react';
import { StatusDetailBottomSheet } from './components/BottomSheet/StatusBottomSheet/StatusBottomSheet';
import TierLevelBottomSheet from './components/BottomSheet/TierBottomSheet/TierBottomSheet';

const StatusPage = () => {
  const userId = '10';
  const mainQuestId = '1';
  const { data: userInfo } = useGetUserInfo(userId);
  const { data: statusLists } = useGetStatusList(userId);
  const { data: quests } = useGetUserSubQuests(userId, mainQuestId);
  const [isLevelBottomSheetOpen, setIsLevelBottomSheetOpen] = useState(false);
  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [selectedStatusKey, setSelectedStatusKey] = useState<number>(101);
  const selectedStatus =
    statusLists?.mentality.find((attr) => attr.id === selectedStatusKey) ??
    statusLists?.skill.find((attr) => attr.id === selectedStatusKey);

  return (
    <>
      {userInfo && (
        <Header
          nickname={userInfo.nickname}
          tier={userInfo.tier}
          level={userInfo.level}
          levelPercent={userInfo.levelPercent}
          profileImageUrl={userInfo.profileImageUrl}
          onClick={() => setIsLevelBottomSheetOpen(true)}
        />
      )}
      <main className="main">
        {statusLists && userInfo && (
          <RadarChart
            mentalData={statusLists.mentality}
            skillData={statusLists.skill}
            profileImage={userInfo.profileImageUrl}
            onClick={(key: number) => {
              setSelectedStatusKey(key);
              setIsStatusBottomSheetOpen(true);
            }}
          />
        )}
        {quests && <QuestList quests={quests} />}
      </main>
      <TierLevelBottomSheet
        isOpen={isLevelBottomSheetOpen}
        onClose={() => setIsLevelBottomSheetOpen(false)}
        tier={userInfo?.tier || 'Bronze'}
        level={userInfo?.level || 1}
      />
      <StatusDetailBottomSheet
        isOpen={isStatusBottomSheetOpen}
        onClose={() => {
          setIsStatusBottomSheetOpen(false);
          setSelectedStatusKey(101);
        }}
        statusKey={selectedStatusKey}
        status={
          selectedStatus
            ? {
                value: selectedStatus.value,
                growth: selectedStatus.growth,
                level: selectedStatus.level,
              }
            : null
        }
      />
    </>
  );
};

export default StatusPage;
