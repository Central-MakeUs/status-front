import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { useGetRandomSubQuestByMainQuestId } from '@/api/hooks/quest/useGetRandomSubQuestByMainQuestId';
import { PAGE_PATHS } from '@/constants/pagePaths';
import {
  DISPLAY_SUB_QUEST_COUNT,
  getSubQuestFrequencyLabel,
  MAX_SUB_QUEST_COUNT,
  SUB_QUEST_FREQUENCY_SELECT_OPTIONS,
} from '@/constants/quest';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepAction } from '@/pages/quest/new/components/StepAction/StepAction';
import { StepDescription } from '@/pages/quest/new/components/StepDescription/StepDescription';
import { StepRefreshButton } from '@/pages/quest/new/components/StepRefreshButton/StepRefreshButton';
import { BottomSheet } from '@/components/ui/BottomSheet/BottomSheet';
import { Button } from '@/components/ui/Button/Button';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { Select } from '@/components/ui/Selelct/Select';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';
import IconCheckboxNormal from '@/assets/icons/icon-checkbox-normal.svg?react';
import IconCheckboxChecked from '@/assets/icons/icon-checkbox-checked.svg?react';
import IconEdit from '@/assets/icons/icon-edit.svg?react';

import type { SubQuestFrequencyValue, UserSubQuest } from '@/types/quest';

import classNames from 'classnames/bind';
import styles from './StepSubQuestPage.module.scss';

const cx = classNames.bind(styles);

export const StepSubQuestPage = () => {
  const navigate = useNavigate();
  const {
    selectedMainQuest,
    subQuests,
    selectedSubQuestIds,
    setSubQuests,
    updateSubQuest,
    toggleSubQuestSelection,
  } = useQuestCreationStore(
    useShallow((state) => ({
      selectedMainQuest: state.selectedMainQuest,
      subQuests: state.subQuests,
      selectedSubQuestIds: state.selectedSubQuestIds,
      setSubQuests: state.setSubQuests,
      updateSubQuest: state.updateSubQuest,
      toggleSubQuestSelection: state.toggleSubQuestSelection,
    }))
  );

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [editingSubQuest, setEditingSubQuest] = useState<UserSubQuest | null>(
    null
  );

  useEffect(() => {
    if (!selectedMainQuest) {
      navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE, { replace: true });
    }
  }, [selectedMainQuest, navigate]);

  const hasMaxSubQuestSelection =
    selectedSubQuestIds.length >= MAX_SUB_QUEST_COUNT;
  const isSubQuestSelected = selectedSubQuestIds.length > 0;

  const { data, isLoading, isRefetching, refetch } =
    useGetRandomSubQuestByMainQuestId({
      mainQuestId: selectedMainQuest?.id.toString() ?? '',
      selectedSubQuestIds: selectedSubQuestIds,
      limit: DISPLAY_SUB_QUEST_COUNT,
    });

  useEffect(() => {
    if (data) {
      setSubQuests(data);
    }
  }, [data, setSubQuests]);

  const handleClickSubQuest = (subQuest: UserSubQuest) => {
    const isChecked = selectedSubQuestIds.includes(subQuest.id);

    if (hasMaxSubQuestSelection && !isChecked) {
      return;
    }

    toggleSubQuestSelection(subQuest.id);
  };

  const handleClickEditButton = (subQuest: UserSubQuest) => {
    setIsBottomSheetOpen(true);
    setEditingSubQuest(subQuest);
  };

  const handleChangeSubQuestFrequency = (value: string) => {
    if (!editingSubQuest) {
      return;
    }

    setEditingSubQuest({
      ...editingSubQuest,
      frequency: value as SubQuestFrequencyValue,
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
      repeatCnt: value,
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
    refetch();
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
            {selectedMainQuest?.title}에 맞는 서브 퀘스트를 추천해드렸어요.
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
            {subQuests?.map((subQuest) => {
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
                            {getSubQuestFrequencyLabel(subQuest.frequency)}
                          </span>
                          <span className={cx('sub-quest-repeat')}>
                            {subQuest.repeatCnt}회
                          </span>
                        </div>
                        <p className={cx('sub-quest-description')}>
                          {subQuest.desc}
                        </p>
                      </div>
                      <button
                        type="button"
                        className={cx('button-edit')}
                        onClick={() => handleClickEditButton(subQuest)}
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
      <StepAction
        disabled={!isSubQuestSelected}
        onClick={handleClickNextButton}
      >
        다음
      </StepAction>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      >
        <BottomSheet.Header>
          <BottomSheet.Title>퀘스트 편집하기</BottomSheet.Title>
          <BottomSheet.Description>
            {editingSubQuest?.desc}
          </BottomSheet.Description>
        </BottomSheet.Header>
        <BottomSheet.Content>
          <Select
            label="반복 주기"
            value={editingSubQuest?.frequency ?? ''}
            options={SUB_QUEST_FREQUENCY_SELECT_OPTIONS}
            onChange={handleChangeSubQuestFrequency}
          />
          <TextInput
            className={cx('bottom-sheet-input')}
            type="number"
            inputMode="numeric"
            label="횟수"
            value={
              editingSubQuest?.repeatCnt === 0 ? '' : editingSubQuest?.repeatCnt
            }
            onChange={handleChangeSubQuestRepeatCount}
          />
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <Button variant="secondary" onClick={handleClickEditingDoneButton}>
            완료
          </Button>
        </BottomSheet.Footer>
      </BottomSheet>
    </>
  );
};

export default StepSubQuestPage;

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
