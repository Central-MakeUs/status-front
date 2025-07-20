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
import { ATTRIBUTE_DESCS, ATTRIBUTE_TEXTS } from '@/constants/attribute';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';

import BurningSVG from '@/assets/icons/icon-burning.svg?react';
import StagnationSVG from '@/assets/icons/icon-stagnation.svg?react';

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
  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [selectedStatusKey, setSelectedStatusKey] = useState<number>(101);
  const selectedStatus =
    statusLists?.mentality.find((attr) => attr.id === selectedStatusKey) ??
    statusLists?.skill.find((attr) => attr.id === selectedStatusKey);

  const selectedValue = selectedStatus?.value ?? 0;
  console.log(selectedValue);
  const selectedGrowth = selectedStatus?.growth ?? 0;
  const StatusIcon =
    selectedGrowth === 1
      ? BurningSVG
      : selectedGrowth === -1
        ? StagnationSVG
        : null;
  const selectedLevel = selectedStatus?.level ?? 1;

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
          <Button
            variant="tertiary"
            onClick={() => setIsLevelBottomSheetOpen(false)}
          >
            닫기
          </Button>
        </BottomSheet.Footer>
      </BottomSheet>
      <BottomSheet
        isOpen={isStatusBottomSheetOpen}
        onClose={() => {
          setIsStatusBottomSheetOpen(false);
          setSelectedStatusKey(101);
        }}
        style={{ minHeight: 'unset' }}
      >
        <BottomSheet.Header>
          <BottomSheet.Title>
            <div className={cx('status-title')}>
              <AttributeIcon id={selectedStatusKey} />[
              {
                ATTRIBUTE_TEXTS[
                  selectedStatusKey as keyof typeof ATTRIBUTE_TEXTS
                ]
              }
              ] 능력치
            </div>
          </BottomSheet.Title>
          <BottomSheet.Description>
            {ATTRIBUTE_DESCS[selectedStatusKey as keyof typeof ATTRIBUTE_DESCS]}
          </BottomSheet.Description>
        </BottomSheet.Header>
        <BottomSheet.Content>
          <div className={cx('status-detail')}>
            <div className={cx('status-text')}>
              <div className={cx('growth-message')}>
                {selectedGrowth === 1 && '성장이 불타는 중!'}
                {selectedGrowth === -1 && '성장이 얼어가는 중...'}
                {selectedGrowth === 0 && '스퍼트를 내볼 차례!'}
              </div>
              <div className={cx('level')}>
                {StatusIcon && <StatusIcon className={cx('icon')} />}
                <span>Lv. {selectedLevel} </span>
                <span className={cx('level-max')}>/99</span>
              </div>
            </div>
            <div className={cx('xp-bar')}>
              <div
                className={cx('filled')}
                style={{ width: `${selectedValue}%` }}
              />
            </div>

            <div className={cx('xp-remaining')}>
              (레벨업까지 +{100 - selectedValue}xp)
            </div>
          </div>
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <Button
            variant="tertiary"
            onClick={() => {
              setIsStatusBottomSheetOpen(false);
              setSelectedStatusKey(101);
            }}
          >
            닫기
          </Button>
        </BottomSheet.Footer>
      </BottomSheet>
    </>
  );
};
export default StatusPage;
