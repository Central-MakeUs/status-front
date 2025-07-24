import { useLocation, useParams } from 'react-router-dom';
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
import { Header } from '@/components/ui/Header/Header';
import { getWeeksDifference } from '@/utils/date';
import { AttributeIcon } from '@/components/ui/AttributeIcon/AttributeIcon';
import type { AttributeReward } from '@/types/attribute';
import { QuestList } from '@/pages/status/components/QuestList/QuestList';
import { useGetUserSubQuests } from '@/api/hooks/quest/useGetUserSubQuests';
import { useGetUserMainQuest } from '@/api/hooks/quest/useGetUserMainQuest';
import TodayCompletedQuests from './components/TodayCompletedQuests/TodayCompletedQuests';
import CompletedHistory from './components/CompletedHistory/CompletedHistory';

const cx = classNames.bind(styles);

const QuestDetailPage = () => {
  const { id: mainQuestId } = useParams();
  const { state } = useLocation();
  const userId = '10';

  const { data: quest } = useGetUserMainQuest(userId, mainQuestId || '');
  const { data: subQuests } = useGetUserSubQuests(userId, mainQuestId || '');

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(state !== null);
  const [selectedSubQuest, setSelectedSubQuest] = useState<UserSubQuest | null>(
    state?.quest
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
      <Header title="퀘스트 상세" hasBackButton={true} />
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
                <li key={attribute.attributeId} className={cx('reward-item')}>
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
            }}
          />
          <TodayCompletedQuests userId={userId} />
          <CompletedHistory />
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
    </>
  );
};

export default QuestDetailPage;
