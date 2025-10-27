import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { QuestReportBottomSheet } from './ui/QuestReportBottomSheet/QuestReportBottomSheet';
import { usePostUsersSubQuestLog } from '@/entities/user-quest/api/usePostUsersSubQuestLog';
import { SubQuestRewardDialog } from './ui/SubQuestRewardDialog/SubQuestRewardDialog';
import { MainQuestRewardDialog } from './ui/MainQuestRewardDialog/MainQuestRewardDialog';
import { REWARD_STEP } from '@/shared/config/quest-template';

import type { RewardStep } from '@/shared/model/quest-template';
import type { SubQuestDifficulty } from '@/shared/model/quest-template';

import classNames from 'classnames/bind';
import styles from './QuestDetailPage.module.scss';
import { Header } from '@/widgets/global-header/ui/Header';
import { getWeeksDifference } from '@/shared/lib/date';
import { AttributeIcon } from '@/shared/ui/AttributeIcon/AttributeIcon';
import { QuestList } from '@/pages/status/ui/QuestList/QuestList';
import { useGetUsersSubQuests } from '@/entities/user-quest/api/useGetUsersSubQuests';
import { useGetUsersMainQuest } from '@/entities/user-quest/api/useGetUsersMainQuest';
import TodayCompletedQuests from './ui/TodayCompletedQuests/TodayCompletedQuests';
import CompletedHistory from './ui/CompletedHistory/CompletedHistory';
import { useDeleteUsersMainQuest } from '@/entities/user-quest/api/useDeleteUsersMainQuest';
import { PAGE_PATHS } from '@/app/providers/paths';
import { QuestGiveUpDialog } from './ui/QuestGiveUpDialog/QuestGiveUpDialog';
import IconDelete from '@/assets/icons/icon-delete.svg?react';
import { StatusDetailBottomSheet } from '@/pages/status/ui/StatusBottomSheet/StatusBottomSheet';
import { useGetUsersAttributes } from '@/entities/user/api/useGetUsersAttributes';
import type { AttributeDTO } from '@/shared/api/attribute.dto';
import { useGetUsersCompletedLists } from '@/entities/user-quest/api/useGetUsersCompletedLists';
import { format } from 'date-fns';
import { usePatchUsersSubQuestLog } from '@/entities/user-quest/api/usePatchUsersSubQuestLog';
import type {
  SubQuestLog,
  UsersSubQuest,
} from '@/entities/user-quest/model/user-quest';
const cx = classNames.bind(styles);
const today = format(new Date(), 'yyyy.MM.dd');

const QuestDetailPage = () => {
  const navigate = useNavigate();
  const { id: mainQuestId } = useParams();
  const { state } = useLocation();

  const { data: quest } = useGetUsersMainQuest(Number(mainQuestId));
  const { data: subQuests } = useGetUsersSubQuests(Number(mainQuestId));
  const { data: completedHistory } = useGetUsersCompletedLists(
    Number(mainQuestId)
  );
  const { data: attributeDatas } = useGetUsersAttributes();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(state !== null);
  const [selectedSubQuest, setSelectedSubQuest] =
    useState<UsersSubQuest | null>(state?.quest);
  const [memo, setMemo] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<SubQuestDifficulty | null>(null);
  const [rewardStep, setRewardStep] = useState<RewardStep>('none');
  const [isGiveUpDialogOpen, setIsGiveUpDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const postUserSubQuestLog = usePostUsersSubQuestLog();
  const deleteUserMainQuest = useDeleteUsersMainQuest();
  const patchUserSubQuestLog = usePatchUsersSubQuestLog();

  const [isStatusBottomSheetOpen, setIsStatusBottomSheetOpen] = useState(false);
  const [selectedStatusKey, setSelectedStatusKey] = useState<number>(101);
  const [isMainQuestCompleted, setIsMainQuestCompleted] =
    useState<boolean>(false);
  const [editingLogId, setEditingLogId] = useState<number | null>(null);
  const selectedAttribute = attributeDatas?.find(
    (attr) => attr.attributeId === selectedStatusKey
  );

  const handleChangeMemo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleSubQuestClaimReward = () => {
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

    if (isEdit) {
      if (!editingLogId) return; // 방어
      const payload: SubQuestLog = {
        id: editingLogId,
        difficulty: selectedDifficulty!,
        memo,
      };
      patchUserSubQuestLog.mutate(payload, {
        onSuccess: () => {
          setIsBottomSheetOpen(false);
          setMemo('');
          setSelectedDifficulty(null);

          setIsEdit(false);
        },
        onError: () => {
          // [TODO] 에러 처리 throw?
        },
      });
    } else {
      const payload: SubQuestLog = {
        id: selectedSubQuest.subQuestInfo.id,
        difficulty: selectedDifficulty!,
        memo,
      };

      postUserSubQuestLog.mutate(payload, {
        onSuccess: (response) => {
          setIsBottomSheetOpen(false);
          setMemo('');
          setSelectedDifficulty(null);
          setIsMainQuestCompleted(response.isMainQuestCompleted);
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

    deleteUserMainQuest.mutate(Number(mainQuestId), {
      onSuccess: () => {
        navigate(PAGE_PATHS.QUEST);
      },
      onError: (e) => {
        console.error('give up error', e);
      },
    });
  };

  const handleEdit = (
    quest: UsersSubQuest,
    difficulty: SubQuestDifficulty,
    memo: string,
    logId: number
  ) => {
    setIsBottomSheetOpen(true);
    setSelectedSubQuest(quest);
    setSelectedDifficulty(difficulty);
    setMemo(memo);
    setIsEdit(true);
    setEditingLogId(logId);
  };

  return (
    <>
      <Header>
        <Header.Title>퀘스트 상세</Header.Title>
        <Header.BackButton />
        <Header.Actions>
          <Header.ActionButton>
            <span className="sr-only">퀘스트 포기</span>
            <IconDelete
              onClick={() => setIsGiveUpDialogOpen(true)}
              aria-hidden={true}
            />
          </Header.ActionButton>
        </Header.Actions>
      </Header>
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
                <li key={attribute.id} className={cx('reward-item')}>
                  <button
                    type="button"
                    className={cx('button-reward')}
                    onClick={() => {
                      setIsStatusBottomSheetOpen(true);
                      setSelectedStatusKey(attribute.id);
                    }}
                  >
                    <AttributeIcon id={attribute.id} />
                    <span className={cx('reward-text')}>
                      +{attribute.exp}xp
                    </span>
                  </button>
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
          <TodayCompletedQuests
            quests={
              completedHistory?.find(
                (el) => format(new Date(el.date), 'yyyy.MM.dd') === today
              )?.logs || []
            }
            onClick={handleEdit}
          />
          <CompletedHistory
            completedHistory={
              completedHistory?.filter(
                (el) => format(new Date(el.date), 'yyyy.MM.dd') !== today
              ) || []
            }
            onClick={handleEdit}
          />
        </div>
      </main>
      <QuestReportBottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
          setMemo('');
          setSelectedDifficulty(null);
        }}
        selectedSubQuest={selectedSubQuest}
        selectedDifficulty={selectedDifficulty!}
        onChangeDifficulty={setSelectedDifficulty}
        memo={memo}
        onChangeMemo={handleChangeMemo}
        onQuestReport={handleQuestReport}
      />
      <SubQuestRewardDialog
        isOpen={rewardStep === REWARD_STEP.SUB_QUEST}
        attributes={selectedSubQuest?.subQuestInfo.attributes ?? []}
        onClaim={handleSubQuestClaimReward}
      />
      <MainQuestRewardDialog
        isOpen={rewardStep === REWARD_STEP.MAIN_QUEST}
        attributes={quest?.attributes ?? []}
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
