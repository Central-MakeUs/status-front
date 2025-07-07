import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { useGetRandomSubQuestByMainQuestId } from '@/api/hooks/quest/useGetRandomSubQuestByMainQuestId';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepAction } from '@/pages/quest/new/components/StepAction/StepAction';
import { StepDescription } from '@/pages/quest/new/components/StepDescription/StepDescription';
import { StepRefreshButton } from '@/pages/quest/new/components/StepRefreshButton/StepRefreshButton';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';
import IconCheckboxNormal from '@/assets/icons/icon-checkbox-normal.svg?react';
import IconCheckboxChecked from '@/assets/icons/icon-checkbox-checked.svg?react';
import IconEdit from '@/assets/icons/icon-edit.svg?react';

import type { UserSubQuest } from '@/types/quest';

import classNames from 'classnames/bind';
import styles from './StepSubQuestPage.module.scss';

const cx = classNames.bind(styles);

const DISPLAY_SUB_QUEST_COUNT = 7;
const MAX_SUB_QUEST_COUNT = 5;

export const StepSubQuestPage = () => {
  const navigate = useNavigate();
  const { selectedMainQuest, selectedSubQuests, toggleSelectedSubQuest } =
    useQuestCreationStore();
  const [displaySubQuests, setDisplaySubQuests] = useState<UserSubQuest[]>([]);

  /**
   * [TODO] URL로 접근하는 등 validation 체크 로직
   * 전체 스탭에서 공통화 할 수 있을지도 고민해보기 e.g. 라우터에서 처리?
   */
  useEffect(() => {
    if (!selectedMainQuest) {
      navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE, { replace: true });
    }
  }, [selectedMainQuest, navigate]);

  const hasMaxSubQuestSelection =
    selectedSubQuests.length >= MAX_SUB_QUEST_COUNT;
  const remainingCount = DISPLAY_SUB_QUEST_COUNT - selectedSubQuests.length;
  const isSubQuestSelected = selectedSubQuests.length > 0;

  const { data, isLoading, isRefetching, refetch } =
    useGetRandomSubQuestByMainQuestId({
      mainQuestId: selectedMainQuest?.id.toString() ?? '',
      selectedSubQuestIds: selectedSubQuests.map((subQuest) => subQuest.id),
      limit: remainingCount,
    });

  useEffect(() => {
    if (data && displaySubQuests.length === 0) {
      setDisplaySubQuests([...selectedSubQuests, ...data]);
    }
  }, [data, selectedSubQuests, displaySubQuests.length]);

  const handleClickSubQuest = (subQuest: UserSubQuest) => {
    const isChecked = selectedSubQuests.some(
      (selected) => selected.id === subQuest.id
    );

    if (hasMaxSubQuestSelection && !isChecked) {
      return;
    }

    toggleSelectedSubQuest(subQuest);
  };

  const handleClickEditButton = () => {
    // [TODO] 바텀 시트 추가
  };

  const handleClickRefreshButton = async () => {
    if (remainingCount === 0) {
      return;
    }

    const { data } = await refetch();

    const combinedData = [...selectedSubQuests, ...(data ?? [])];

    setDisplaySubQuests(combinedData);
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
            {displaySubQuests?.map((subQuest) => {
              const isChecked = selectedSubQuests.some(
                (selected) => selected.id === subQuest.id
              );
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
                          <span
                            className={cx('sub-quest-value', {
                              basic:
                                subQuest.questValueName.toLowerCase() ===
                                'basic',
                              rare:
                                subQuest.questValueName.toLowerCase() ===
                                'rare',
                              epic:
                                subQuest.questValueName.toLowerCase() ===
                                'epic',
                            })}
                          >
                            {subQuest.questValueName}
                          </span>
                          <span className={cx('sub-quest-frequency')}>
                            {subQuest.frequency}
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
                        onClick={handleClickEditButton}
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
          isLoading={isLoading}
        />
      </main>
      <StepAction
        disabled={!isSubQuestSelected}
        onClick={handleClickNextButton}
      >
        다음
      </StepAction>
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
