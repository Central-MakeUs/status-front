import { Header } from '@/pages/status/components/Header/Header';
import { RadarChart } from '@/pages/status/components/RadarChart/RadarChart';
import { QuestList } from '@/pages/status/components/QuestList/QuestList';
import { useGetUserInfo } from '@/api/hooks/user/useGetUserInfo';
import { useGetStatusList } from '@/api/hooks/status/useGetStatus';
import { useGetUserSubQuests } from '@/api/hooks/quest/useGetUserSubQuests';
import { useState } from 'react';
import { StatusDetailBottomSheet } from './components/BottomSheet/StatusBottomSheet/StatusBottomSheet';
import TierLevelBottomSheet from './components/BottomSheet/TierBottomSheet/TierBottomSheet';
import type { UserSubQuest } from '@/types/quest';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';

const selectedStatusDefault = {
  value: 0,
  growth: 0,
  level: 0,
  fullXp: 0,
  xpLeft: 0,
};

const StatusPage = () => {
  const navigate = useNavigate();
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
          profileImageUrl={userInfo.profileImageUrl}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();

            setIsLevelBottomSheetOpen(true);
          }}
        />
      )}
      <main className="main">
        {statusLists && userInfo && (
          <RadarChart
            mentalData={statusLists.mentality}
            skillData={statusLists.skill}
            profileImage={userInfo.profileImageUrl}
            onClick={(event: React.MouseEvent, key: number) => {
              event.stopPropagation();

              setSelectedStatusKey(key);
              setIsStatusBottomSheetOpen(true);
            }}
          />
        )}
        {quests && (
          <QuestList
            quests={quests}
            onClick={(_, quest: UserSubQuest) => {
              console.log(quest);
              navigate(
                `${PAGE_PATHS.QUEST_DETAIL.replace(':id', mainQuestId)}`,
                {
                  state: { quest: quest },
                }
              );
            }}
          />
        )}
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
        status={selectedStatus ?? selectedStatusDefault}
      />
    </>
  );
};

export default StatusPage;
