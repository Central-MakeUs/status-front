import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { QuestReportBottomSheet } from '@/pages/quest/detail/components/QuestReportBottomSheet/QuestReportBottomSheet';
import { usePostUserSubQuestLog } from '@/api/hooks/quest/usePostUserSubQuestLog';
import { SubQuestRewardDialog } from '@/pages/quest/detail/components/SubQuestRewardDialog/SubQuestRewardDialog';
import { MainQuestRewardDialog } from '@/pages/quest/detail/components/MainQuestRewardDialog/MainQuestRewardDialog';
import { REWARD_STEP } from '@/constants/quest';

import type {
  RewardStep,
  SubQuestDifficulty,
  UserMainQuestGiveUp,
  UserSubQuest,
  UserSubQuestLog,
} from '@/types/quest';

import classNames from 'classnames/bind';
import styles from './QuestDetailPage.module.scss';
import { Header } from '@/components/ui/Header/Header';
import { getWeeksDifference } from '@/utils/date';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
import type { AttributeReward } from '@/types/attribute';
import { QuestList } from '@/pages/status/components/QuestList/QuestList';
import { useGetUserSubQuests } from '@/api/hooks/quest/useGetUserSubQuests';
import { useGetUserMainQuest } from '@/api/hooks/quest/useGetUserMainQuest';
import TodayCompletedQuests from './components/TodayCompletedQuests/TodayCompletedQuests';
import CompletedHistory from './components/CompletedHistory/CompletedHistory';
import { usePostUserGiveUpMainQuest } from '@/api/hooks/quest/usePostUserGiveUpMainQuest';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { QuestGiveUpDialog } from './components/QuestGiveUpDialog/QuestGiveUpDialog';
import IconDelete from '@/assets/icons/icon-delete.svg?react';
import { StatusDetailBottomSheet } from '@/pages/status/components/BottomSheet/StatusBottomSheet/StatusBottomSheet';
import { useGetStatusList } from '@/api/hooks/status/useGetStatus';

const cx = classNames.bind(styles);

const selectedStatusDefault = {
  value: 0,
  growth: 0,
  level: 0,
  fullXp: 0,
  xpLeft: 0,
};

const QuestDetailPage = () => {
  const navigate = useNavigate();
  const { id: mainQuestId } = useParams();
  const { state } = useLocation();
  const userId = '10';

  const { data: quest } = useGetUserMainQuest(userId, mainQuestId || '');
  const { data: subQuests } = useGetUserSubQuests(userId, mainQuestId || '');
  const { data: statusLists } = useGetStatusList(userId);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(state !== null);
  const [selectedSubQuest, setSelectedSubQuest] = useState<UserSubQuest | null>(
    state?.quest
  );
  const [memo, setMemo] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<SubQuestDifficulty>('default');
  const [rewardStep, setRewardStep] = useState<RewardStep>('none');
  const [isGiveUpDialogOpen, setIsGiveUpDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const postUserSubQuestLog = usePostUserSubQuestLog();
  const postUserGiveUpMainQuest = usePostUserGiveUpMainQuest();
  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [selectedStatusKey, setSelectedStatusKey] = useState<number>(101);
  const selectedStatus =
    statusLists?.mentality.find((attr) => attr.id === selectedStatusKey) ??
    statusLists?.skill.find((attr) => attr.id === selectedStatusKey);

  const handleChangeMemo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleSubQuestClaimReward = () => {
    // [TODO] mutation 후 main/sub quest 완료 유무 조회를 위해 요청 필요?
    const isMainQuestCompleted = true;

    if (isMainQuestCompleted) {
      setRewardStep(REWARD_STEP.MAIN_QUEST);
    } else {
      setRewardStep(REWARD_STEP.COMPLETED);
      setSelectedSubQuest(null);
    }
  };

  const handleMainQuestClaimReward = () => {
    setRewardStep(REWARD_STEP.COMPLETED);
    setSelectedSubQuest(null);
  };

  const handleQuestReport = () => {
    if (!selectedSubQuest) return;

    const payload: UserSubQuestLog = {
      // [TODO] 유저 정보 추가
      userId: userId,
      userSubQuestId: selectedSubQuest.id,
      difficulty: selectedDifficulty,
    };

    postUserSubQuestLog.mutate(payload, {
      onSuccess: () => {
        setIsBottomSheetOpen(false);
        setMemo('');
        setSelectedDifficulty('default');

        if (!isEdit) {
          setRewardStep(REWARD_STEP.SUB_QUEST);
        }
        setIsEdit(false);
      },
      onError: () => {
        // [TODO] 에러 처리 throw?
      },
    });
  };
  const handleQuestGiveUp = () => {
    if (!mainQuestId) return;

    const payload: UserMainQuestGiveUp = {
      userId: userId,
      mainQuestId: mainQuestId,
    };

    postUserGiveUpMainQuest.mutate(payload, {
      onSuccess: () => {
        navigate(PAGE_PATHS.QUEST);
      },
      onError: () => {},
    });
  };
  const handleEdit = (
    quest: UserSubQuest,
    difficulty: SubQuestDifficulty,
    memo: string
  ) => {
    setIsBottomSheetOpen(true);
    setSelectedSubQuest(quest);
    setSelectedDifficulty(difficulty);
    setMemo(memo);
    setIsEdit(true);
  };

  return (
    <>
      <Header
        title="퀘스트 상세"
        hasBackButton={true}
        rightAction={<IconDelete onClick={() => setIsGiveUpDialogOpen(true)} />}
      ></Header>
      <main className="main">
        {quest && (
          <div className={cx('quest-detail')}>
            <span className={cx('main-quest-date')}>
              기한_{quest.endDate} (총
              {getWeeksDifference(quest.startDate, quest.endDate)}
              주)
            </span>
            <strong className={cx('main-quest-title')}>{quest.title}</strong>
            <ul className={cx('reward-list')}>
              {quest.attributes?.map((attribute: AttributeReward) => (
                <li
                  key={attribute.attributeId}
                  className={cx('reward-item')}
                  onClick={() => {
                    setIsStatusBottomSheetOpen(true);
                    setSelectedStatusKey(attribute.attributeId);
                  }}
                >
                  <AttributeIcon id={attribute.attributeId} />
                  <span className={cx('reward-text')}>+{attribute.exp}xp</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={cx('quest-component')}>
          <QuestList
            quests={subQuests || []}
            className="quest-detail-header"
            onClick={(quest) => {
              setIsBottomSheetOpen(true);
              setSelectedSubQuest(quest);
              setIsEdit(false);
            }}
          />
          <TodayCompletedQuests userId={userId} onClick={handleEdit} />
          <CompletedHistory userId={userId} onClick={handleEdit} />
        </div>
      </main>
      <QuestReportBottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        selectedSubQuest={selectedSubQuest}
        selectedDifficulty={selectedDifficulty}
        onChangeDifficulty={setSelectedDifficulty}
        memo={memo}
        onChangeMemo={handleChangeMemo}
        onQuestReport={handleQuestReport}
      />
      <SubQuestRewardDialog
        isOpen={rewardStep === REWARD_STEP.SUB_QUEST}
        attributes={selectedSubQuest?.attributes ?? []}
        onClaim={handleSubQuestClaimReward}
      />
      <MainQuestRewardDialog
        isOpen={rewardStep === REWARD_STEP.MAIN_QUEST}
        attributes={selectedSubQuest?.attributes ?? []}
        onClaim={handleMainQuestClaimReward}
      />
      <QuestGiveUpDialog
        isOpen={isGiveUpDialogOpen}
        onClose={() => setIsGiveUpDialogOpen(false)}
        onConfirm={handleQuestGiveUp}
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

export default QuestDetailPage;
