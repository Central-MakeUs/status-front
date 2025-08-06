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
import { useGetUserAttributes } from '@/api/hooks/attribute';
import type { AttributeDTO } from '@/api/types/attribute';
import { useGetUserCompletedLists } from '@/api/hooks/quest/useGetUserCompletedHistory';
import dayjs from 'dayjs';
import { usePatchUserSubQuestLog } from '@/api/hooks/quest/usePatchUserSubQuestLog ';
const cx = classNames.bind(styles);
const today = dayjs().format('YYYY.MM.DD');

const QuestDetailPage = () => {
  const navigate = useNavigate();
  const { id: mainQuestId } = useParams();
  const { state } = useLocation();

  const { data: quest } = useGetUserMainQuest(Number(mainQuestId));
  const { data: subQuests } = useGetUserSubQuests(Number(mainQuestId));
  const { data: completedHistory } = useGetUserCompletedLists(
    Number(mainQuestId)
  );
  const { data: attributeDatas } = useGetUserAttributes();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(state !== null);
  const [selectedSubQuest, setSelectedSubQuest] = useState<UserSubQuest | null>(
    state?.quest
  );
  const [memo, setMemo] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<SubQuestDifficulty | null>(null);
  const [rewardStep, setRewardStep] = useState<RewardStep>('none');
  const [isGiveUpDialogOpen, setIsGiveUpDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const postUserSubQuestLog = usePostUserSubQuestLog();
  const postUserGiveUpMainQuest = usePostUserGiveUpMainQuest();
  const patchUserSubQuestLog = usePatchUserSubQuestLog();

  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [selectedStatusKey, setSelectedStatusKey] = useState<number>(101);
  // 선택된 속성 정보 찾기
  const selectedAttribute = attributeDatas?.find(
    (attr) => attr.attributeId === selectedStatusKey
  );

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
    if (!selectedSubQuest || !selectedDifficulty) return;
    const payload: UserSubQuestLog = {
      id: selectedSubQuest.userSubQuest.id,
      difficulty: selectedDifficulty,
      memo: memo,
    };

    if (isEdit) {
      patchUserSubQuestLog.mutate(payload, {
        onSuccess: () => {
          setIsBottomSheetOpen(false);
          setMemo('');
          setSelectedDifficulty('default');

          setIsEdit(false);
        },
        onError: () => {
          // [TODO] 에러 처리 throw?
        },
      });
    } else {
      postUserSubQuestLog.mutate(payload, {
        onSuccess: () => {
          setIsBottomSheetOpen(false);
          setMemo('');
          setSelectedDifficulty('default');

          setRewardStep(REWARD_STEP.SUB_QUEST);
          setIsEdit(false);
        },
        onError: () => {
          // [TODO] 에러 처리 throw?
        },
      });
    }
  };
  const handleQuestGiveUp = () => {
    if (!mainQuestId) return;

    const payload: UserMainQuestGiveUp = {
      id: Number(mainQuestId),
    };

    postUserGiveUpMainQuest.mutate(payload, {
      onSuccess: () => {
        navigate(PAGE_PATHS.QUEST);
      },
      onError: () => {},
    });
  };
  const handleEdit = (
    event: React.MouseEvent,
    quest: UserSubQuest,
    difficulty: SubQuestDifficulty,
    memo: string
  ) => {
    event.stopPropagation();

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
              {quest.attributes?.map((attribute: AttributeDTO) => (
                <li
                  key={attribute.id}
                  className={cx('reward-item')}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsStatusBottomSheetOpen(true);
                    setSelectedStatusKey(attribute.id);
                  }}
                >
                  <AttributeIcon id={attribute.id} />
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
            onClick={(event, quest) => {
              event.stopPropagation();

              setIsBottomSheetOpen(true);
              setSelectedSubQuest(quest);
              setIsEdit(false);
            }}
          />
          <TodayCompletedQuests
            quests={
              completedHistory?.find(
                (el) =>
                  dayjs(el.date, 'YYYY.MM.DD').format('YYYY.MM.DD') === today
              )?.logs || []
            }
            onClick={handleEdit}
          />
          <CompletedHistory
            completedHistory={
              completedHistory?.filter(
                (el) =>
                  dayjs(el.date, 'YYYY.MM.DD').format('YYYY.MM.DD') !== today
              ) || []
            }
            onClick={handleEdit}
          />
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
        attributes={selectedSubQuest?.userSubQuest.attributes ?? []}
        onClaim={handleSubQuestClaimReward}
      />
      <MainQuestRewardDialog
        isOpen={rewardStep === REWARD_STEP.MAIN_QUEST}
        attributes={selectedSubQuest?.userSubQuest.attributes ?? []}
        onClaim={handleMainQuestClaimReward}
      />
      <QuestGiveUpDialog
        isOpen={isGiveUpDialogOpen}
        onClose={() => setIsGiveUpDialogOpen(false)}
        onConfirm={handleQuestGiveUp}
      />
      {selectedAttribute && (
        <StatusDetailBottomSheet
          isOpen={isStatusBottomSheetOpen}
          onClose={() => setIsStatusBottomSheetOpen(false)}
          statusKey={selectedStatusKey}
          attribute={selectedAttribute}
        />
      )}
    </>
  );
};

export default QuestDetailPage;
