import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGetRandomCategoriesByAttributes } from '@/api/hooks/category';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepAction } from '@/pages/quest/new/components/StepAction/StepAction';
import { StepDescription } from '@/pages/quest/new/components/StepDescription/StepDescription';
import { StepRadioGroupSkeleton } from '@/pages/quest/new/components/StepRadioGroup/StepRadioGroupSkeleton';
import { StepRadioGroup } from '@/pages/quest/new/components/StepRadioGroup/StepRadioGroup';
import { StepRefreshButton } from '@/pages/quest/new/components/StepRefreshButton/StepRefreshButton';

export const StepCategoryPage = () => {
  const navigate = useNavigate();
  const {
    selectedCategory,
    selectedMentalityAttribute,
    selectedSkillAttribute,
    setSelectedCategory,
  } = useQuestCreationStore(
    useShallow((state) => ({
      selectedCategory: state.selectedCategory,
      selectedMentalityAttribute: state.selectedMentalityAttribute,
      selectedSkillAttribute: state.selectedSkillAttribute,
      setSelectedCategory: state.setSelectedCategory,
    }))
  );

  /**
   * [TODO] URL로 접근하는 등 validation 체크 로직
   * 전체 스탭에서 공통화 할 수 있을지도 고민해보기 e.g. 라우터에서 처리?
   */
  const isValidAttributes =
    selectedMentalityAttribute && selectedSkillAttribute;

  useEffect(() => {
    if (!isValidAttributes) {
      navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE, { replace: true });
    }
  }, [isValidAttributes, navigate]);

  const { data, isLoading, isRefetching, refetch } =
    useGetRandomCategoriesByAttributes({
      attributeIds: isValidAttributes
        ? [
            selectedMentalityAttribute.attributeId,
            selectedSkillAttribute.attributeId,
          ]
        : [],
      limit: 6,
    });

  const handleClickRefreshButton = () => {
    setSelectedCategory(null);
    refetch();
  };

  const handleClickNextButton = () => {
    if (!selectedCategory) {
      return;
    }

    navigate(PAGE_PATHS.QUEST_NEW_MAIN_QUESTION);
  };

  return (
    <>
      <Header title="퀘스트 만들기" hasBackButton={true} />
      <main className="main">
        <StepTitle>시도하고 싶은 카테고리를 선택하세요!</StepTitle>
        <StepDescription>
          {`${selectedMentalityAttribute?.name}, ${selectedSkillAttribute?.name}을(를) 성장시킬 수 있는 카테고리를 추천해드렸어요`}
        </StepDescription>

        {isLoading || isRefetching ? (
          <StepRadioGroupSkeleton />
        ) : (
          <StepRadioGroup
            label="카테고리 선택"
            data={data}
            value={selectedCategory}
            onClick={setSelectedCategory}
          />
        )}

        <StepRefreshButton
          onClick={handleClickRefreshButton}
          isLoading={isLoading || isRefetching}
        />
      </main>
      <StepAction disabled={!selectedCategory} onClick={handleClickNextButton}>
        다음
      </StepAction>
    </>
  );
};

export default StepCategoryPage;
