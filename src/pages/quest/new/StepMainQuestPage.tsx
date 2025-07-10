import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { useGetRandomMainQuestByCategoryId } from '@/api/hooks/quest/useGetRandomMainQuestByCategoryId';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepAction } from '@/pages/quest/new/components/StepAction/StepAction';
import { StepDescription } from '@/pages/quest/new/components/StepDescription/StepDescription';
import { StepRadioGroupSkeleton } from '@/pages/quest/new/components/StepRadioGroup/StepRadioGroupSkeleton';
import { StepRadioGroup } from '@/pages/quest/new/components/StepRadioGroup/StepRadioGroup';
import { StepRefreshButton } from '@/pages/quest/new/components/StepRefreshButton/StepRefreshButton';

import IconLogo from '@/assets/icons/icon-logo-default.svg?react';

export const StepMainQuestPage = () => {
  const navigate = useNavigate();
  const { selectedCategory, selectedMainQuest, setSelectedMainQuest } =
    useQuestCreationStore(
      useShallow((state) => ({
        selectedCategory: state.selectedCategory,
        selectedMainQuest: state.selectedMainQuest,
        setSelectedMainQuest: state.setSelectedMainQuest,
      }))
    );

  /**
   * [TODO] URL로 접근하는 등 validation 체크 로직
   * 전체 스탭에서 공통화 할 수 있을지도 고민해보기 e.g. 라우터에서 처리?
   */
  useEffect(() => {
    if (!selectedCategory) {
      navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE, { replace: true });
    }
  }, [selectedCategory, navigate]);

  const { data, isLoading, isRefetching, refetch } =
    useGetRandomMainQuestByCategoryId({
      categoryId: selectedCategory?.id.toString() ?? '',
      limit: 6,
    });

  const handleClickRefreshButton = () => {
    setSelectedMainQuest(null);
    refetch();
  };

  const handleClickNextButton = () => {
    if (!selectedCategory) {
      return;
    }

    navigate(PAGE_PATHS.QUEST_NEW_SUB_QUESTION);
  };

  return (
    <>
      <Header title="퀘스트 만들기" hasBackButton={true} />
      <main className="main">
        <StepTitle logo={<IconLogo />}>메인 퀘스트를 선택해주세요!</StepTitle>
        {selectedCategory && (
          <StepDescription>
            {selectedCategory?.name}에 맞는 메일 퀘스트를 추천해드렸어요.
          </StepDescription>
        )}
        {isLoading || isRefetching ? (
          <StepRadioGroupSkeleton />
        ) : (
          <StepRadioGroup
            label="메인 퀘스트 선택"
            data={data}
            value={selectedMainQuest}
            onClick={setSelectedMainQuest}
          />
        )}
        <StepRefreshButton
          onClick={handleClickRefreshButton}
          isLoading={isLoading || isRefetching}
        />
      </main>
      <StepAction disabled={!selectedMainQuest} onClick={handleClickNextButton}>
        다음
      </StepAction>
    </>
  );
};
