import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useGetThemes } from '@/api/hooks/quest/useGetThemes';
import { useQuestCreationStore } from '@/stores/questCreationStore';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { Header } from '@/components/ui/Header/Header';
import { StepTitle } from '@/pages/quest/new/components/StepTitle/StepTitle';
import { StepActions } from '@/pages/quest/new/components/StepActions/StepActions';
import { StepDescription } from '@/pages/quest/new/components/StepDescription/StepDescription';
import { StepRadioGroupSkeleton } from '@/pages/quest/new/components/StepRadioGroup/StepRadioGroupSkeleton';
import { StepRadioGroup } from '@/pages/quest/new/components/StepRadioGroup/StepRadioGroup';
import { StepRefreshButton } from '@/pages/quest/new/components/StepRefreshButton/StepRefreshButton';
import { useGetRandomThemes } from '@/api/hooks/quest/useGetRandomThemes';

export const StepCategoryPage = () => {
  const navigate = useNavigate();
  const { selectedAttribute, selectedTheme, setSelectedTheme } =
    useQuestCreationStore(
      useShallow((state) => ({
        selectedAttribute: state.selectedAttribute,
        selectedTheme: state.selectedTheme,
        setSelectedTheme: state.setSelectedTheme,
      }))
    );

  const isValidAttributes = selectedAttribute !== null;

  useEffect(() => {
    if (!isValidAttributes) {
      navigate(PAGE_PATHS.QUEST_NEW_ATTRIBUTE, { replace: true });
    }
  }, [isValidAttributes, navigate]);

  const attributeNames = useMemo(
    () => selectedAttribute?.name ?? '',
    [selectedAttribute]
  );

  const selectedAttributeIds = useMemo(
    () => selectedAttribute?.attributeId ?? 0,
    [selectedAttribute]
  );

  const { data, isLoading, isRefetching } = useGetThemes({
    attributes: [selectedAttributeIds],
  });

  const currentThemeIds = data?.map((theme) => theme.id) ?? [];

  const { refreshThemes } = useGetRandomThemes();

  const handleClickRefreshButton = () => {
    setSelectedTheme(null);

    refreshThemes({
      attributes: [selectedAttributeIds],
      themes: currentThemeIds,
    });
  };

  const handleClickNextButton = () => {
    if (!selectedTheme) {
      return;
    }

    navigate(PAGE_PATHS.QUEST_NEW_MAIN_QUEST);
  };

  return (
    <>
      <Header title="퀘스트 만들기" hasBackButton={true} />
      <main className="main">
        <StepTitle>시도하고 싶은 테마를 선택하세요!</StepTitle>
        <StepDescription>
          {attributeNames}을(를) 성장시킬 수 있는 테마를 추천해드렸어요
        </StepDescription>

        {isLoading || isRefetching ? (
          <StepRadioGroupSkeleton />
        ) : (
          <StepRadioGroup
            label="카테고리 선택"
            data={data}
            value={selectedTheme}
            onClick={setSelectedTheme}
          />
        )}

        <StepRefreshButton
          onClick={handleClickRefreshButton}
          isLoading={isLoading || isRefetching}
        />
      </main>
      <StepActions disabled={!selectedTheme} onClick={handleClickNextButton}>
        다음
      </StepActions>
    </>
  );
};

export default StepCategoryPage;
