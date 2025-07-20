import { Header } from '@/pages/status/components/Header/Header';
import { RadarChart } from '@/pages/status/components/RadarChart/RadarChart';
import { QuestList } from '@/pages/status/components/QuestList/QuestList';
import { useGetUserInfo } from '@/api/hooks/user/useGetUserInfo';
import { useGetStatusList } from '@/api/hooks/status/useGetStatus';
import { useGetUserSubQuests } from '@/api/hooks/quest/useGetUserSubQuests';
import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './StatusPage.module.scss';
import type { TierType } from '@/types/tier';
import { TierIcon } from '@/components/ui/TierIcon/TierIcon';

const cx = classNames.bind(styles);

const TierLevelList = ({
  currentTier,
  currentLevel,
}: {
  currentTier: TierType;
  currentLevel: number;
}) => {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Dia'];
  return (
    <div className={cx('tier-list')}>
      {tiers.map((tier) => {
        return (
          <div
            key={tier}
            className={`${cx('tier-item')} ${tier === currentTier ? cx('active') : ''}`}
          >
            <span className={cx('tier-name')}>
              {tier}
              {tier === currentTier ? `_${currentLevel}` : ''}
            </span>
            <TierIcon id={tier} className={cx('tier-icon')} />
          </div>
        );
      })}
    </div>
  );
};

const StatusPage = () => {
  const userId = '10';
  const mainQuestId = '1';
  const { data: userInfo } = useGetUserInfo(userId);
  const { data: statusLists } = useGetStatusList(userId);
  const { data: quests } = useGetUserSubQuests(userId, mainQuestId);
  const [isLevelBottomSheetOpen, setIsLevelBottomSheetOpen] = useState(false);
  // const [isStatusBottomSheetOpen, setIsStautsBottomSheetOpen] = useState(false);

  // const dataLists = [
  //   [60, 60, 80, 60, 60, 65], // 의지력, 집중력, 자기 통제력, 창의성, 성실성, 대담성 각각 점수
  //   [75, 75, 65, 70, 60, 75], // 문장술, 창조기술, 학습 집중, 신체 수련, 기술 응용, 공감 소통 각각 점수
  // ];

  // // 위와 동일 1 : 버닝, 0: 일반 -1: 정체
  // const growthStatusList = [
  //   [1, 0, 0, -1, 0, 0],
  //   [1, 1, -1, 0, 0, -1],
  // ];

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
            mentalData={statusLists.statusDataList[0]}
            skillData={statusLists.statusDataList[1]}
            profileImage={userInfo.profileImageUrl}
            growthStatusList={statusLists.growthStatusList}
            levelList={statusLists.levelList}
            // xpLeftList={statusLists.xpLeftList}
          />
        )}
        {quests && <QuestList quests={quests} />}
      </main>
      <BottomSheet
        isOpen={isLevelBottomSheetOpen}
        onClose={() => setIsLevelBottomSheetOpen(false)}
      >
        <BottomSheet.Header>
          <BottomSheet.Title>전체 레벨 현황</BottomSheet.Title>
          <BottomSheet.Description>
            모든 레벨은 1-10 단계로 세분화됩니다.
          </BottomSheet.Description>
        </BottomSheet.Header>
        <BottomSheet.Content>
          <TierLevelList
            currentTier={userInfo?.tier || 'Bronze'}
            currentLevel={userInfo?.level || 1}
          />
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <Button variant="primary" onClick={() => {}}>
            닫기
          </Button>
        </BottomSheet.Footer>
      </BottomSheet>
    </>
  );
};
export default StatusPage;
