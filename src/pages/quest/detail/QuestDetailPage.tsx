import { useState } from 'react';
import { QuestReportBottomSheet } from '@/pages/quest/detail/components/QuestReportBottomSheet/QuestReportBottomSheet';
import { usePostUserSubQuestLog } from '@/api/hooks/quest/usePostUserSubQuestLog';
import { SubQuestRewardDialog } from '@/pages/quest/detail/components/SubQuestRewardDialog/SubQuestRewardDialog';
import { MainQuestRewardDialog } from '@/pages/quest/detail/components/MainQuestRewardDialog/MainQuestRewardDialog';
import { REWARD_STEP } from '@/constants/quest';

import type {
  RewardStep,
  SubQuestDifficulty,
  UserSubQuest,
  UserSubQuestLog,
} from '@/types/quest';

import classNames from 'classnames/bind';
import styles from './QuestDetailPage.module.scss';

const cx = classNames.bind(styles);

// [TODO] 퀘스트 상세 페이지 구현 후 제거
const DUMMY_SUB_QUEST: UserSubQuest = {
  id: '1',
  desc: '핸드폰 없이 아침 루틴(세면+식사+기록) 수행',
  defaultFrequency: 'daily',
  defaultRepeat: 1,
  frequency: 'daily',
  repeatCnt: 1,
  attributes: [
    { attributeId: 203, name: '기록', type: 'skill', level: 1, exp: 5 },
    { attributeId: 103, name: '제어', type: 'mentality', level: 1, exp: 3 },
  ],
  essential: false,
};

const QuestDetailPage = () => {
  // [TODO] 퀘스트 상세 페이지 구현 후 초기값 변경
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [selectedSubQuest, setSelectedSubQuest] = useState<UserSubQuest | null>(
    DUMMY_SUB_QUEST
  );
  const [memo, setMemo] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<SubQuestDifficulty>('default');
  const [rewardStep, setRewardStep] = useState<RewardStep>('none');

  const postUserSubQuestLog = usePostUserSubQuestLog();

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
      userId: '1',
      userSubQuestId: selectedSubQuest.id,
      difficulty: selectedDifficulty,
    };

    postUserSubQuestLog.mutate(payload, {
      onSuccess: () => {
        setIsBottomSheetOpen(false);
        setMemo('');
        setSelectedDifficulty('default');
        // [TODO] 수정 시 트리거 되지 않아야 함. 로직 분리 필요?
        setRewardStep(REWARD_STEP.SUB_QUEST);
      },
      onError: () => {
        // [TODO] 에러 처리 throw?
      },
    });
  };

  return (
    <>
      <main className="main">
        <div className={cx('quest-detail')}></div>
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
    </>
  );
};

export default QuestDetailPage;
