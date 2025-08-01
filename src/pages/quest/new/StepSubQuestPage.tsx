import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { PAGE_PATHS } from '@/constants/pagePaths';
import {
  DISPLAY_SUB_QUEST_COUNT,
  getSubQuestFrequencyLabel,
  MAX_SUB_QUEST_COUNT,
} from '@/constants/quest';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepActions } from '@/pages/quest/new/components/StepActions/StepActions';
import { StepDescription } from '@/pages/quest/new/components/StepDescription/StepDescription';
import { StepRefreshButton } from '@/pages/quest/new/components/StepRefreshButton/StepRefreshButton';
import { EditingSubQuestBottomSheet } from '@/pages/quest/new/components/EditingSubQuestBottomSheet/EditingSubQuestBottomSheet';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';
import IconCheckboxNormal from '@/assets/icons/icon-checkbox-normal.svg?react';
import IconCheckboxChecked from '@/assets/icons/icon-checkbox-checked.svg?react';
import IconEdit from '@/assets/icons/icon-edit.svg?react';

import type { SubQuest, SubQuestFrequencyValue } from '@/types/quest';

import classNames from 'classnames/bind';
import styles from './StepSubQuestPage.module.scss';
import { useGetSubQuests } from '@/api/hooks/quest/useGetSubQuests';
import { useGetRandomSubQuests } from '@/api/hooks/quest/useGetRandomSubQuests';

const cx = classNames.bind(styles);

const StepSubQuestPage = () => {
  const navigate = useNavigate();
  const {
    selectedAttributes,
    selectedMainQuest,
    selectedSubQuestIds,
    updateSubQuest,
    toggleSubQuestSelection,
  } = useQuestCreationStore(
    useShallow((state) => ({
      selectedAttributes: state.selectedAttributes,
      selectedMainQuest: state.selectedMainQuest,
      selectedSubQuestIds: state.selectedSubQuestIds,
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

  const selectedAttributesIds = selectedAttributes.map(
    (attribute) => attribute.attributeId
  );

  const { data, isLoading, isRefetching } = useGetSubQuests({
    attributes: selectedAttributesIds,
    mainQuest: selectedMainQuest?.id ?? 0,
  });

  const { mutate: refreshSubQuests } = useGetRandomSubQuests();

  const handleClickSubQuest = (subQuest: SubQuest) => {
    const isChecked = selectedSubQuestIds.includes(subQuest.id);

    if (hasMaxSubQuestSelection && !isChecked) {
      return;
    }

    toggleSubQuestSelection(subQuest.id);
  };

  const handleClickEditButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    subQuest: SubQuest
  ) => {
    event.stopPropagation();

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

    setEditingSubQuest({
      ...editingSubQuest,
      actionUnitNum: value,
    });
  };

  const handleClickEditingDoneButton = () => {
    if (!editingSubQuest) {
      return;
    }

    updateSubQuest(editingSubQuest);
    setEditingSubQuest(null);
    setIsBottomSheetOpen(false);
  };

  const handleClickRefreshButton = () => {
    const payload = {
      attributes: selectedAttributesIds,
      mainQuest: selectedMainQuest?.id ?? 0,
      selectedSubQuests: selectedSubQuestIds,
      gottenSubQuests: data?.map((subQuest) => subQuest.id) ?? [],
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
      <Header title="퀘스트 만들기" hasBackButton={true} />
      <main className="main">
        <StepTitle logo={<IconLogo />}>
          서브 퀘스트를 1~5개 선택해주세요!
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
          <ul className={cx('step-sub-quest-list')}>
            {data?.map((subQuest) => {
              const isChecked = selectedSubQuestIds.includes(subQuest.id);
              const shouldShowSkeleton = isRefetching && !isChecked;

              return (
                <li
                  key={subQuest.id}
                  role="none"
                  className={cx('step-sub-quest-list-item')}
                >
                  {shouldShowSkeleton ? (
                    <SubQuestSkeleton />
                  ) : (
                    <>
                      <div
                        role="checkbox"
                        tabIndex={0}
                        className={cx('checkbox')}
                        aria-checked={isChecked}
                        onClick={() => handleClickSubQuest(subQuest)}
                      >
                        {isChecked ? (
                          <IconCheckboxChecked
                            className={cx('checkbox-icon')}
                            aria-hidden="true"
                          />
                        ) : (
                          <IconCheckboxNormal
                            className={cx('checkbox-icon')}
                            aria-hidden="true"
                          />
                        )}
                        <div className={cx('sub-quest-box')}>
                          <span className={cx('sub-quest-frequency')}>
                            {getSubQuestFrequencyLabel(subQuest.frequencyType)}
                          </span>
                          <span className={cx('sub-quest-repeat')}>
                            {subQuest.actionUnitNum}회
                          </span>
                        </div>
                        <p className={cx('sub-quest-description')}>
                          {subQuest.desc}
                        </p>
                      </div>
                      <button
                        type="button"
                        className={cx('button-edit')}
                        onClick={(event) =>
                          handleClickEditButton(event, subQuest)
                        }
                      >
                        <IconEdit
                          className={cx('edit-icon')}
                          aria-hidden="true"
                        />
                        <span className="sr-only">수정</span>
                      </button>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <StepRefreshButton
          onClick={handleClickRefreshButton}
          isLoading={isLoading || isRefetching}
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

const SubQuestSkeleton = () => {
  return (
    <div className={cx('sub-quest-skeleton')} aria-hidden="true">
      <div className={cx('sub-quest-skeleton-icon')}></div>
      <div className={cx('sub-quest-skeleton-frequency')}></div>
      <div className={cx('sub-quest-skeleton-description')}></div>
      <div className={cx('sub-quest-skeleton-edit')}></div>
    </div>
  );
};

export default StepSubQuestPage;
