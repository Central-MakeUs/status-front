import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useQuestCreationStore } from '@/features/create-quest/model/create-quest-store';
import { PAGE_PATHS } from '@/shared/config/paths';
import {
  DISPLAY_SUB_QUEST_COUNT,
  MAX_SUB_QUEST_COUNT,
  ACTION_UNIT_TYPE_OPTIONS,
} from '@/shared/config/quest-template';
import { Header } from '@/widgets/global-header/ui/header';
import { StepTitle } from '@/features/create-quest/ui/step-title/step-title';
import { StepActions } from '@/features/create-quest/ui/step-actions/step-actions';
import { StepDescription } from '@/features/create-quest/ui/step-description/step-description';
import { StepRefreshButton } from '@/features/create-quest/ui/step-refresh-button/step-refresh-button';
import { EditingSubQuestBottomSheet } from '@/features/create-quest/ui/editing-sub-quest-bottom-sheet/editing-sub-quest-bottom-sheet';
import { useGetSubQuests } from '@/entities/quest-template/api/use-get-sub-quests';
import { useGetRandomSubQuests } from '@/entities/quest-template/api/use-get-random-sub-quests';
import { SubQuestSkeleton } from '@/features/create-quest/ui/sub-quest-skeleton/sub-quest-skeleton';
import { SubQuestList } from '@/features/create-quest/ui/sub-quest-list/sub-quest-list';
import { validateSubQuestEditing } from '@/features/create-quest/model/create-quest-schema';

import type {
  SubQuest,
  SubQuestFrequencyValue,
} from '@/entities/quest-template/model/quest-template';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';

import classNames from 'classnames/bind';
import styles from './step-sub-quest-page.module.scss';

const cx = classNames.bind(styles);

const StepSubQuestPage = () => {
  const navigate = useNavigate();
  const {
    selectedAttribute,
    selectedMainQuest,
    selectedSubQuestIds,
    subQuests,
    setSubQuests,
    updateSubQuest,
    toggleSubQuestSelection,
  } = useQuestCreationStore(
    useShallow((state) => ({
      selectedAttribute: state.selectedAttribute,
      selectedMainQuest: state.selectedMainQuest,
      selectedSubQuestIds: state.selectedSubQuestIds,
      subQuests: state.subQuests,
      setSubQuests: state.setSubQuests,
      updateSubQuest: state.updateSubQuest,
      toggleSubQuestSelection: state.toggleSubQuestSelection,
    }))
  );

  useEffect(() => {
    if (!selectedMainQuest) {
      navigate(PAGE_PATHS.QUEST_NEW_MAIN_QUEST, { replace: true });
    }
  }, [selectedMainQuest, navigate]);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [editingSubQuest, setEditingSubQuest] = useState<SubQuest | null>(null);

  const hasMaxSubQuestSelection =
    selectedSubQuestIds.length >= MAX_SUB_QUEST_COUNT;
  const isSubQuestSelected = selectedSubQuestIds.length > 0;

  const selectedAttributeId = useMemo(
    () => selectedAttribute?.attributeId ?? 0,
    [selectedAttribute]
  );

  const selectedMainQuestId = useMemo(
    () => selectedMainQuest?.id ?? 0,
    [selectedMainQuest]
  );

  const { data, isLoading } = useGetSubQuests({
    attributes: [selectedAttributeId],
    mainQuest: selectedMainQuestId,
  });

  const { mutate: refreshSubQuests, isPending } = useGetRandomSubQuests();

  useEffect(() => {
    if (data) {
      setSubQuests(data);
    }
  }, [data, setSubQuests]);

  const handleClickSubQuest = (subQuest: SubQuest) => {
    const isChecked = selectedSubQuestIds.includes(subQuest.id);

    if (hasMaxSubQuestSelection && !isChecked) {
      return;
    }

    toggleSubQuestSelection(subQuest.id);
  };

  const handleClickEditButton = (subQuest: SubQuest) => {
    setIsBottomSheetOpen(true);
    setEditingSubQuest(subQuest);
  };

  const handleChangeSubQuestFrequency = (value: SubQuestFrequencyValue) => {
    if (!editingSubQuest) {
      return;
    }

    setEditingSubQuest({
      ...editingSubQuest,
      frequencyType: value,
    });
  };

  const handleChangeSubQuestRepeatCount = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);

    if (!editingSubQuest || isNaN(value)) {
      return;
    }

    const actionUnitType = editingSubQuest.actionUnitType;
    const actionUnitTypeOptions =
      ACTION_UNIT_TYPE_OPTIONS[
        actionUnitType as keyof typeof ACTION_UNIT_TYPE_OPTIONS
      ];

    if (value > actionUnitTypeOptions.max) {
      return;
    }

    setEditingSubQuest({
      ...editingSubQuest,
      actionUnitNum: value,
    });
  };

  const handleClickEditingDoneButton = () => {
    if (!editingSubQuest) {
      return;
    }

    const validationResult = validateSubQuestEditing(editingSubQuest);

    if (!validationResult.success) {
      return;
    }

    updateSubQuest(editingSubQuest);
    setEditingSubQuest(null);
    setIsBottomSheetOpen(false);
  };

  const handleClickRefreshButton = () => {
    const currentSubQuestIds = subQuests.map((subQuest) => subQuest.id);

    const payload = {
      attributes: [selectedAttributeId],
      mainQuest: selectedMainQuestId,
      selectedSubQuests: selectedSubQuestIds,
      gottenSubQuests: currentSubQuestIds,
    };

    refreshSubQuests(payload);
  };

  const handleClickNextButton = () => {
    if (!isSubQuestSelected) {
      return;
    }

    navigate(PAGE_PATHS.QUEST_NEW_SCHEDULE);
  };

  return (
    <>
      <Header>
        <Header.Title>퀘스트 만들기</Header.Title>
        <Header.BackButton />
      </Header>
      <main className="main">
        <StepTitle logo={<IconLogo />}>
          서브 퀘스트를 1~3개 선택해주세요!
        </StepTitle>
        {selectedMainQuest && (
          <StepDescription>
            {selectedMainQuest?.name}에 맞는 서브 퀘스트를 추천해드렸어요.
          </StepDescription>
        )}
        {isLoading ? (
          <div className={cx('sub-quest-skeleton-container')}>
            {Array.from({ length: DISPLAY_SUB_QUEST_COUNT }).map((_, index) => (
              <SubQuestSkeleton key={index} />
            ))}
          </div>
        ) : (
          <SubQuestList
            subQuests={subQuests}
            selectedSubQuestIds={selectedSubQuestIds}
            isPending={isLoading || isPending}
            handleClickSubQuest={handleClickSubQuest}
            handleClickEditButton={handleClickEditButton}
          />
        )}
        <StepRefreshButton
          onClick={handleClickRefreshButton}
          isLoading={isLoading || isPending}
        />
      </main>
      <StepActions
        disabled={!isSubQuestSelected}
        onClick={handleClickNextButton}
      >
        다음
      </StepActions>
      <EditingSubQuestBottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        editingSubQuest={editingSubQuest}
        handleChangeSubQuestFrequency={handleChangeSubQuestFrequency}
        handleChangeSubQuestRepeatCount={handleChangeSubQuestRepeatCount}
        handleClickEditingDoneButton={handleClickEditingDoneButton}
      />
    </>
  );
};

export default StepSubQuestPage;
