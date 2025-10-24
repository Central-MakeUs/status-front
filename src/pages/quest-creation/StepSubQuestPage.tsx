import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useQuestCreationStore } from './model/questCreationStore';
import { PAGE_PATHS } from '@/app/providers/paths';
import {
  DISPLAY_SUB_QUEST_COUNT,
  MAX_SUB_QUEST_COUNT,
  ACTION_UNIT_TYPE_OPTIONS,
} from '@/entities/sub-quest/config/constants';
import { Header } from '@/shared/ui/Header/Header';
import { StepTitle } from './ui/StepTitle/StepTitle';
import { StepActions } from './ui/StepActions/StepActions';
import { StepDescription } from './ui/StepDescription/StepDescription';
import { StepRefreshButton } from './ui/StepRefreshButton/StepRefreshButton';
import { EditingSubQuestBottomSheet } from './ui/EditingSubQuestBottomSheet/EditingSubQuestBottomSheet';
import { useGetSubQuests } from '@/entities/sub-quest/api/useGetSubQuests';
import { useGetRandomSubQuests } from './api/useGetRandomSubQuests';
import { SubQuestSkeleton } from './ui/SubQuestSkeleton/SubQuestSkeleton';
import { SubQuestList } from './ui/SubQuestList/SubQuestList';
import { validateSubQuestEditing } from '@/pages/quest-creation/model/subQuestEditingScheme';

import type {
  SubQuest,
  SubQuestFrequencyValue,
} from '@/entities/sub-quest/model/types';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';

import classNames from 'classnames/bind';
import styles from './StepSubQuestPage.module.scss';

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
